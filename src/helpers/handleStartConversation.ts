// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { ACCOUNT_TYPE_DEFINITIONS } from '../data/ACCOUNT_TYPE_DEFINITIONS'
import { type DBConvo } from '../typedefs/DBConvo'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleStartConversation(convo: Conversation, convoState: DBConvo) {
	logger.log('Selecting account type...')
	convoState.state = 'selecting-account-type'
	const messages = await renderTemplate('en', 'select-account-type', { accountTypes: ACCOUNT_TYPE_DEFINITIONS })
	await sendMessages(convo, messages)
	logger.log('Waiting for response.')

	setConvoState(convoState)
}
