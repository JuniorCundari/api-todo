import { Request, Response } from 'express'

import UsersRepository from '../repositories/UsersRepository'

class UserController {
  async index(request: Request, response: Response) {
    return response.send({ userID: request.userId })
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body

    const userExists = await UsersRepository.findByEmail(email)

    if (userExists) {
      return response.status(409).json({ error: 'User already exists' })
    }

    const user = await UsersRepository.create(name, email, password)

    response.json(user)
  }
}

export default new UserController()
