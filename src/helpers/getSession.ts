// Module imports
import { type AtpSessionData } from '@atcute/client'





// Local imports
import { database } from './database'





export function getSession() {
	return database
		.query('SELECT * FROM sessions LIMIT 1;')
		.get() as AtpSessionData
}
