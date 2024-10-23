// Module imports
import {
	type Conversation,
	type Profile,
} from '@skyware/bot'





// Local imports
import { createModerationReport } from './createModerationReport'
import { type DBConvo } from '../typedefs/DBConvo'
import { sendMessages } from './sendMessages'
import { renderTemplate } from './renderTemplate'
import { setConvoState } from './setConvoState'





export async function handleVerificationRequest(user: Profile, convo: Conversation, convoState: DBConvo) {
	if (convoState.verification?.length) {
		convoState.state = 'verification-in-progress'
		await sendMessages(convo, await renderTemplate('verification-in-progress'))

		await createModerationReport(user.did, convoState)

		setConvoState(convoState)
	} else {
		await sendMessages(convo, await renderTemplate('missing-verification'))
	}
}
