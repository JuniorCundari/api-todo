import { query } from '../../database'

class UsersRepository {
  async findAll() {
    const rows = await query('SELECT * FROM users')

    return rows
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM users WHERE id = $1', [id])

    return row
  }

  async findByEmail(email: string) {
    const [row] = await query('SELECT * FROM users WHERE email = $1', [email])

    return row
  }

  async create(name: string, email: string, password: string) {
    const [row] = await query(
      `
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [name, email, password],
    )

    return row
  }

  async update(name: string, email: string, password: string, id: string) {
    const [row] = await query(
      `
      UPDATE users
      SET name = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING *
    `,
      [name, email, password, id],
    )

    return row
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM users WHERE id = $1', [id])

    return deleteOp
  }
}

export default new UsersRepository()
