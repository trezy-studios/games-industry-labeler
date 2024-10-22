// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { type AccountTypeDefinition } from '../typedefs/AccountTypeDefinition'
import accountTypes from '../data/account-types.json' with { type: 'json' }
import { type DBConvo } from '../typedefs/DBConvo'
import { getLabelsForAccountType } from './getLabelsForAccountType'
import { logger } from './logger'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleSelectAccountType(parsedMessage: string, convo: Conversation, convoState: DBConvo) {
	const accountType = (accountTypes as unknown as AccountTypeDefinition[]).find(item => item.id === parsedMessage.trim())

	if (accountType) {
		logger.log('Selecting labels...')
		convoState.accountType = accountType.labelID
		convoState.state = 'selecting-labels'
		setConvoState(convoState)
		const messages = await renderTemplate('selecting-labels', {
			labels: getLabelsForAccountType(accountType),
		})
		await sendMessages(convo, messages)
		logger.log('Waiting for response.')
	} else {
		await sendMessages(convo, await renderTemplate('unrecognised-account-type', { accountTypes }))
	}

}
