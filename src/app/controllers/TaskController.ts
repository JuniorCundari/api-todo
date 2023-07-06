import { Response, Request } from 'express'

import TasksRepository from '../repositories/TasksRepository'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { Task } from '../../models/Task'

class TaskController {
  async index(request: Request, response: Response) {
    const { user } = request

    const tasks: Task[] = await TasksRepository.findAll(user.id)

    response.status(200).json(tasks)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const task: Task = await TasksRepository.findById(id)

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    return response.status(200).json(task)
  }

  async store(request: Request, response: Response) {
    const { user } = request
    const { title, completed } = request.body

    if (!title) {
      throw new BadRequestError('Title is required')
    }

    const task: Task = await TasksRepository.create(title, completed, user.id)

    return response.status(201).json(task)
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { title, completed } = request.body

    const taskExists = await TasksRepository.findById(id)
    if (!taskExists) {
      throw new NotFoundError('Task not found')
    }

    if (!title) {
      throw new BadRequestError('Title is required')
    }

    const task: Task = await TasksRepository.update(title, completed, id)

    response.status(200).json(task)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params

    const task: Task = await TasksRepository.findById(id)

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    await TasksRepository.delete(id)
    response.sendStatus(204)
  }
}

export default new TaskController()
