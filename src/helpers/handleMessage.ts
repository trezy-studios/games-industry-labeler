// Module imports
import { type ChatMessage } from '@skyware/bot'





// Local imports
import { getConvoState } from './getConvoState'
import { handleFirstMessage } from './handleFirstMessage'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { handleStartConversation } from './handleStartConversation'
import { handleCancelConversation } from './handleCancelConversation'
import { handleConfirmCancelConversation } from './handleConfirmCancelConversation'
import { handleSelectLabels } from './handleSelectLabels'
import { handleVerificationRequest } from './handleVerificationRequest'
import { handleSelectAccountType } from './handleSelectAccountType'
import { setConvoState } from './setConvoState'
import { unparseMessage } from './unparseMessage'





export async function handleMessage(message: ChatMessage) {
	const [
		convo,
		sender,
	] = await Promise.all([
		message.getConversation(),
		message.getSender(),
	])

	if (!convo) {
		return
	}

	logger.group(`Received message from ${sender.displayName} (${sender.handle})`)

	const parsedMessage = message.text.trim().toLowerCase()
	let convoState = await getConvoState(convo)

	if (!convoState) {
		await handleFirstMessage(convo)
	} else if (parsedMessage === 'start') {
		await handleStartConversation(convo, convoState)
	} else if ((parsedMessage === 'cancel') && !convoState.attemptingCancellation) {
		await handleCancelConversation(convo, convoState)
	} else if ((parsedMessage === 'confirm') && convoState.attemptingCancellation) {
		await handleConfirmCancelConversation(convo, convoState)
	} else if (convoState.state === 'selecting-account-type') {
		await handleSelectAccountType(parsedMessage, convo, convoState)
	} else if (convoState.state === 'selecting-labels') {
		await handleSelectLabels(parsedMessage, sender, convo, convoState)
	} else if (convoState.state === 'awaiting-verification') {
		if (parsedMessage === 'verify') {
			await handleVerificationRequest(sender, convo, convoState)
		} else {
			const verification = new Set(convoState.verification ?? [])
			verification.add(unparseMessage(message))
			convoState.verification = Array.from(verification)
			setConvoState(convoState)
		}
	} else if (convoState.state === 'verification-in-progress') {
		await sendMessages(convo, await renderTemplate('impatient'))
	} else {
		logger.log('Message parsed; nothing for us to do.')
	}

	logger.groupEnd()
}
