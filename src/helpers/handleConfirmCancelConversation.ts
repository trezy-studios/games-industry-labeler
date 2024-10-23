// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { type DBConvo } from '../typedefs/DBConvo'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleConfirmCancelConversation(convo: Conversation, convoState: DBConvo) {
	await sendMessages(convo, await renderTemplate('cancelling'))
	setConvoState(convoState, true)
}
