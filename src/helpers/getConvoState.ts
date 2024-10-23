// Module imports
import { type Conversation } from '@skyware/bot'





// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'





function parseJSONField(fieldName: string, defaultValue: () => any, json: Record<string, any>) {
	let result = json[fieldName]

	if (typeof result === 'string') {
		try {
			result = JSON.parse(result)
		} catch (error) {
			result = defaultValue()
		}
	} else {
		result = defaultValue()
	}

	return result
}

export async function getConvoState(convo: Conversation) {
	const result = database
		.query('SELECT * FROM convos WHERE id = $id;')
		.get({ $id: convo.id }) as DBConvo | null

	if (result) {
		result.verification = parseJSONField('verification', () => [] as string[], result)
		result.verifiedLabels = parseJSONField('verifiedLabels', () => [] as string[], result)
	}

	return result
}
