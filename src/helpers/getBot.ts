// Module imports
import { type AtpSessionData } from '@atcute/client'





// Local imports
import { Bot } from '@skyware/bot'
import { getSession } from './getSession'
import { saveSession } from './saveSession'





// Variables
let bot: Bot





export async function getBot() {
	if (!bot) {
		bot = new Bot({
			emitChatEvents: true,
			emitEvents: false,
		})

		let session = getSession()

		if (session) {
			session = await bot.resumeSession(session) as AtpSessionData
		} else {
			session = await bot.login({
				identifier: process.env.LABELER_USERNAME!,
				password: process.env.LABELER_PASSWORD!,
			}) as AtpSessionData
		}

		saveSession(session as unknown as AtpSessionData)
	}

	return bot
}
