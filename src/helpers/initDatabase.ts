// Local imports
import { database } from './database'





export function initDatabase() {
	database.exec('PRAGMA journal_mode = WAL;')

	database
		.query(`
			CREATE TABLE IF NOT EXISTS sessions (
				accessJwt TEXT NOT NULL,
				active BOOLEAN NOT NULL,
				did TEXT NOT NULL PRIMARY KEY,
				email TEXT,
				emailConfirmed BOOLEAN,
				emailAuthFactor BOOLEAN,
				handle TEXT NOT NULL,
				refreshJwt TEXT NOT NULL
			);
		`)
		.run()

	database
		.query(`
			CREATE TABLE IF NOT EXISTS convos (
				attemptingCancellation BOOLEAN,
				id TEXT NOT NULL PRIMARY KEY,
				state INTEGER CHECK (
					state IN (
						'selecting-account-type',
						'selecting-labels',
						'applying-labels',
						'awaiting-verification',
						'verification-in-progress'
					)
				),
				verification TEXT CHECK (json_valid(verification) OR verification IS NULL),
				verifiedLabels TEXT CHECK (json_valid(verifiedLabels) OR verifiedLabels IS NULL)
			);
		`)
		.run()
}
