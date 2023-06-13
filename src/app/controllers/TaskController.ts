import { Response, Request } from 'express'

import TasksRepository from '../repositories/TasksRepository'

class TaskController {
  async index(request: Request, response: Response) {
    const tasks = await TasksRepository.findAll()

    response.json(tasks)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const task = await TasksRepository.findById(id)

    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    response.json(task)
  }

  async store(request: Request, response: Response) {
    const { title, isCompleted } = request.body

    if (!title) {
      return response.status(400).json({ error: 'Title is required' })
    }

    const task = await TasksRepository.create(title, isCompleted)

    response.json(task)
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { title, isCompleted } = request.body

    const taskExists = await TasksRepository.findById(id)
    if (!taskExists) {
      return response.status(404).json({ error: 'Task not found' })
    }

    if (!title) {
      return response.status(400).json({ error: 'Title is required' })
    }

    const task = await TasksRepository.update(id, title, isCompleted)

    response.json(task)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params
    const task = await TasksRepository.findById(id)

    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    await TasksRepository.delete(id)
    response.sendStatus(204)
  }
}

export = new TaskController()
