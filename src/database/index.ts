import { Client } from 'pg'

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'todos',
})

client.connect()

export const query = async (query: string, values?: any[]) => {
  const { rows } = await client.query(query, values)
  return rows
}
