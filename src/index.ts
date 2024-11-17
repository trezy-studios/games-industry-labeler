// Local imports
import { collectDefaultMetrics } from 'prom-client'
import { getBot } from './helpers/getBot'
import { handleMessage } from './helpers/handleMessage'
import { initDatabase } from './helpers/initDatabase'
import { logger } from './helpers/logger'
import { startStatsPostScheduler } from './helpers/startStatsPostScheduler'





logger.log('Starting metrics collection...')
collectDefaultMetrics()

logger.group('Initialising database...')
initDatabase()
logger.groupEnd()

const bot = await getBot()

logger.log('Listening for messages...')
bot.on('message', handleMessage)
bot.on('error', (error) => {
	console.error(error)
})

startStatsPostScheduler()
