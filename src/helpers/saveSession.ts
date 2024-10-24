// Module imports
import { type AtpSessionData } from '@atcute/client'





// Local imports
import { database } from './database'





export function saveSession(session: AtpSessionData) {
  database
		.query(`DELETE FROM sessions;`)
		.run()

  const statement = database.prepare(`
    INSERT OR REPLACE INTO sessions (
      accessJwt,
      active,
      did,
      email,
      emailConfirmed,
      emailAuthFactor,
      handle,
      refreshJwt
    ) VALUES (
      $accessJwt,
      $active,
      $did,
      $email,
      $emailConfirmed,
      $emailAuthFactor,
      $handle,
      $refreshJwt
    );
  `)

  statement.run({
    $accessJwt: session.accessJwt,
    $active: session.active,
    $did: session.did,
    $email: session.email ?? null,
    $emailConfirmed: session.emailConfirmed ?? false,
    $emailAuthFactor: session.emailAuthFactor ?? false,
    $handle: session.handle,
    $refreshJwt: session.refreshJwt,
  })
}