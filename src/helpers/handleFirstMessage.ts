// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { inProgressApplications } from './metrics'
import { logger } from './logger'
import { renderTemplate } from './renderTemplate'
import { sendMessages } from './sendMessages'
import { setConvoState } from './setConvoState'





export async function handleFirstMessage(convo: Conversation) {
	inProgressApplications.inc()

	logger.log('Sending greeting...')
	const messages = await renderTemplate('greeting')
	await sendMessages(convo, messages)
	logger.log('Done.')

	setConvoState({ id: convo.id })
}
