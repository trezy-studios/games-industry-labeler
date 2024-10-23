// Module imports
import { LabelerServer } from '@skyware/labeler'
import path from 'path'





const server = new LabelerServer({
	dbPath: process.env.DATABASE_PATH!,
	did: process.env.LABELER_DID!,
	signingKey: process.env.SIGNING_KEY!,
})

server.start(Number(process.env.PORT), error => {
	if (error) {
		console.error('Failed to start server:', error)
	} else {
		console.log(`Labeler server running on port ${process.env.PORT}`)
	}
})
