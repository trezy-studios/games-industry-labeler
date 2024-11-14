// Module imports
import { Client } from 'pg'





// Variables
let client: Client





export async function queryOzoneDatabase(query: string, args?: any[]) {
  if (!client) {
    client = new Client({
      connectionString: process.env.OZONE_DB_POSTGRES_URL,
    })
  }

  await client.connect()

  const result = await client.query(query, args)

  await client.end()

  return result
}
