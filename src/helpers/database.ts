// Module imports
import Database from 'bun:sqlite'
import path from 'node:path'





// Variables
export const database = new Database(
	process.env.DATABASE_PATH!,
	{ create: true },
)
