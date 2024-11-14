// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { ACCOUNT_TYPE_DEFINITIONS } from '../data/ACCOUNT_TYPE_DEFINITIONS'
import { type DBConvo } from '../typedefs/DBConvo'
import { getLabelsForAccountType } from './getLabelsForAccountType'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleSelectAccountType(parsedMessage: string, convo: Conversation, convoState: DBConvo) {
	const accountType = ACCOUNT_TYPE_DEFINITIONS.find(item => item.id === parsedMessage.trim())

	if (accountType) {
		logger.log('Selecting labels...')
		convoState.accountType = accountType.labelID
		convoState.state = 'selecting-labels'
		setConvoState(convoState)
		const messages = await renderTemplate('en', 'selecting-labels', {
			labels: getLabelsForAccountType(accountType),
		})
		await sendMessages(convo, messages)
		logger.log('Waiting for response.')
	} else {
		await sendMessages(convo, await renderTemplate('en', 'unrecognised-account-type', { accountTypes: ACCOUNT_TYPE_DEFINITIONS }))
	}
}
