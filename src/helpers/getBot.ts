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

		try {
			if (!session) {
				throw new Error('No session available to resume.')
			}

			session = await bot.resumeSession(session) as AtpSessionData
		} catch (error) {
			console.log('No session to resume; logging in...')
			session = await bot.login({
				identifier: process.env.LABELER_USERNAME!,
				password: process.env.LABELER_PASSWORD!,
			}) as AtpSessionData
		}

		saveSession(session as unknown as AtpSessionData)
	}

	return bot
}
