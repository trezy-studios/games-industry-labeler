// Local imports
import { Bot } from '@skyware/bot'





// Variables
let bot: Bot





export async function getBot() {
	if (!bot) {
		bot = new Bot({
			emitChatEvents: true,
			emitEvents: false,
			eventEmitterOptions: {
				pollingInterval: 1,
			},
		})

		await bot.login({
			identifier: process.env.LABELER_USERNAME!,
			password: process.env.LABELER_PASSWORD!,
		})
	}

	return bot
}
