// Module imports
import Database from 'bun:sqlite'
import path from 'node:path'





// Variables
export const database = new Database(
	path.join(process.cwd(), 'bot.db'),
	{ create: true },
)
