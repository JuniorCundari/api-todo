import { query } from '../../database'

class TasksRepository {
  async findAll() {
    const rows = await query('SELECT * FROM todo')
    return rows
  }

  async findById(id: string) {
    const [row] = await query('SELECT * FROM todo WHERE id = $1', [id])

    return row
  }

  async create(title: string, isCompleted: boolean) {
    const [row] = await query(
      `
      INSERT INTO todo(title, isCompleted)
      VALUES($1, $2)
      RETURNING *
    `,
      [title, isCompleted],
    )

    return row
  }

  async update(id: string, title: string, isCompleted: boolean) {
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

export = new TasksRepository()
