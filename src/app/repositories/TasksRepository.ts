import { query } from '../../database'

class TasksRepository {
  async findAll(id: string) {
    const rows = await query('SELECT * FROM todo WHERE users_id = $1', [id])

    return rows
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM todo WHERE id = $1', [id])

    return row
  }

  async create(title: string, completed: boolean, userId: string) {
    const [row] = await query(
      `
      INSERT INTO todo(title, completed, users_id)
      VALUES($1, $2, $3)
      RETURNING *
    `,
      [title, completed, userId],
    )

    return row
  }

  async update(title: string, completed: boolean, id: string) {
    const [row] = await query(
      `
      UPDATE todo
      SET title = $1, completed = $2
      WHERE id = $3
      RETURNING *
    `,
      [title, completed, id],
    )

    return row
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM todo WHERE id = $1', [id])

    return deleteOp
  }
}

export default new TasksRepository()
