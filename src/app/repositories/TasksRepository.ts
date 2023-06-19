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

  async create(title: string, isCompleted: boolean, userId: string) {
    const [row] = await query(
      `
      INSERT INTO todo(title, isCompleted, users_id)
      VALUES($1, $2, $3)
      RETURNING *
    `,
      [title, isCompleted, userId],
    )

    return row
  }

  async update(title: string, isCompleted: boolean, id: string) {
    const [row] = await query(
      `
      UPDATE todo
      SET title = $1, isCompleted = $2
      WHERE id = $3
      RETURNING *
    `,
      [title, isCompleted, id],
    )

    return row
  }

  async delete(id: string) {
    const deleteOp = await query('DELETE FROM todo WHERE id = $1', [id])

    return deleteOp
  }
}

export default new TasksRepository()
