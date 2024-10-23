// Local imports
import { getBot } from './helpers/getBot'
import { handleMessage } from './helpers/handleMessage'
import { initDatabase } from './helpers/initDatabase'
import { logger } from './helpers/logger'





// Variables
const bot = await getBot()





logger.group('Initialising database...')
initDatabase()
logger.groupEnd()

logger.log('Listening for messages...')
bot.on('message', handleMessage)
