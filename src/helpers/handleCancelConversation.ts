// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleCancelConversation(convo: Conversation, convoState: DBConvo) {
	convoState.attemptingCancellation = true
	await sendMessages(convo, await renderTemplate('en', 'attempting-cancellation'))

	setConvoState(convoState)
}
