// Module imports
import Database from 'bun:sqlite'





// Variables
export const database = new Database(
	process.env.DATABASE_PATH!,
	{ create: true },
)
