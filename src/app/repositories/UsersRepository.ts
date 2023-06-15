import { query } from '../../database'

import bcrypt from 'bcryptjs'

class UsersRepository {
  async findByEmail(email: string) {
    const [row] = await query('SELECT * FROM users WHERE email = $1', [email])

    return row
  }

  async create(name: string, email: string, password: string) {
    const passwordCrypt = bcrypt.hashSync(password, 8)

    const [row] = await query(
      `
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        RETURNING *
      `,
      [name, email, passwordCrypt],
    )

    return row
  }
}

export default new UsersRepository()
