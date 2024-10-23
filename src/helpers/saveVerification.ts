// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'





export function saveVerification(dbState: DBConvo, verification: string) {
	const statement = database.prepare(`
		UPDATE convos
		SET verification = json_insert(
			CASE
				WHEN json_valid(verification) THEN verification
				ELSE json('[]')
			END,
			'$[#]',
			$verification
		)
		WHERE id = $id
	`)

	statement.run({
		$id: dbState.id,
		$verification: verification,
	})
}
