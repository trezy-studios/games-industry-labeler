// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleFirstMessage(convo: Conversation) {
	logger.log('Sending greeting...')
	const messages = await renderTemplate('greeting')
	await sendMessages(convo, messages)
	logger.log('Done.')

	setConvoState({ id: convo.id })
}
