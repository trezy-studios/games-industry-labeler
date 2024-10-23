// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'





export function getVerification(dbState: DBConvo) {
	const result = database
		.query(`
			SELECT
				CASE
						WHEN json_valid(verification) AND json_type(verification) = 'array' THEN verification
						WHEN json_valid(verification) THEN json_array(verification)
						ELSE json('[]')
				END AS verification_array
			FROM convos
			WHERE id = $id;
		`)
		.get({ $id: dbState.id }) as { verification_array: string } | undefined

	if (!result) {
		return []
	}

	try {
		const verificationArray = JSON.parse(result.verification_array)

		return Array.isArray(verificationArray) ? verificationArray : []
	} catch (error) {
		console.error('Error parsing verification JSON:', error)
		return []
	}
}
