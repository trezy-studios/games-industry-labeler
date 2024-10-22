// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { getVerification } from './getVerification'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleVerificationRequest(convo: Conversation, convoState: DBConvo) {
	const verification = getVerification(convoState)

	if (verification.length) {
		convoState.state = 'verification-in-progress'
		await sendMessages(convo, await renderTemplate('verification-in-progress'))
		setConvoState(convoState)
	} else {
		await sendMessages(convo, await renderTemplate('missing-verification'))
	}
}
