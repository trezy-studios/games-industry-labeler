// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'





export async function getConvoState(convo: Conversation) {
	const result = database
		.query('SELECT * FROM convos WHERE id = $id;')
		.get({ $id: convo.id }) as DBConvo | null

	return result
}
