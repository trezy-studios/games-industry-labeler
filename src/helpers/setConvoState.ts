// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'





export function setConvoState(newState: DBConvo, shouldDelete: boolean = false) {
	let statement

	if (shouldDelete) {
		console.log('Deleting convo...', newState)
		statement = database.prepare(`
			DELETE FROM convos
			WHERE id = $id;
		`)
	} else {
		console.log('Creating (or updating) convo...', newState)
		statement = database.prepare(`
			INSERT OR REPLACE INTO convos (
				id,
				state
			)
			VALUES (
				$id,
				$state
			);
		`)
	}

	statement.run({
		$id: newState.id,
		$state: newState.state ?? null,
	})
}
