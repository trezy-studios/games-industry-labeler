// Local imports
import { database } from './database'
import { type DBConvo } from '../typedefs/DBConvo'

export function setConvoState(
  newState: DBConvo,
  shouldDelete: boolean = false
) {
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
        state,
        verification,
        verifiedLabels
      ) VALUES (
        $id,
        $state,
        CASE
          WHEN $verification IS NOT NULL THEN
            json($verification)
          ELSE
            (SELECT verification FROM convos WHERE id = $id)
        END,
        CASE
          WHEN $verifiedLabels IS NOT NULL THEN
            json($verifiedLabels)
          ELSE
            (SELECT verifiedLabels FROM convos WHERE id = $id)
        END
      );
    `)
  }

  statement.run({
    $id: newState.id,
    $state: newState.state ?? null,
    $verification: newState.verification ? JSON.stringify(newState.verification) : null,
    $verifiedLabels: newState.verifiedLabels ? JSON.stringify(newState.verifiedLabels) : null,
  })
}
