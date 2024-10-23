// Local imports
import type { Conversation } from '@skyware/bot'





export async function sendMessages(convo: Conversation, messages: string[]) {
	let messageIndex = 0

	while (messageIndex < messages.length) {
		const message = messages[messageIndex]
		await convo.sendMessage({ text: message })
		messageIndex += 1
	}
}
