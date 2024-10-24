// Local imports
import { getBot } from './helpers/getBot'
import { handleMessage } from './helpers/handleMessage'
import { initDatabase } from './helpers/initDatabase'
import { logger } from './helpers/logger'





logger.group('Initialising database...')
initDatabase()
logger.groupEnd()

const bot = await getBot()

logger.log('Listening for messages...')
bot.on('message', handleMessage)
