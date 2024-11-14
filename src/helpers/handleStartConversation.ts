// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import accountTypes from '../data/account-types.json' with { type: 'json' }
import { type DBConvo } from '../typedefs/DBConvo'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleStartConversation(convo: Conversation, convoState: DBConvo) {
	logger.log('Selecting account type...')
	convoState.state = 'selecting-account-type'
	const messages = await renderTemplate('en', 'select-account-type', { accountTypes })
	await sendMessages(convo, messages)
	logger.log('Waiting for response.')

	setConvoState(convoState)
}
