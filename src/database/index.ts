import { Client } from 'pg'

const port = process.env.DB_PORT as number | undefined

const client = new Client({
  host: process.env.DB_HOST,
  port,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

client.connect()

export const query = async (query: string, values?: any[]) => {
  const { rows } = await client.query(query, values)
  return rows
}
