import { Request, Response } from 'express'

import bcrypt from 'bcryptjs'

import UsersRepository from '../repositories/UsersRepository'

import { BadRequestError, NotFoundError } from '../helpers/apiError'

import { User } from '../../models/User'

class UserController {
  async index(request: Request, response: Response) {
    const users: User[] = await UsersRepository.findAll()

    response.status(200).json(users)
  }

  async show(request: Request, response: Response) {
    const { user } = request

    delete user.password

    return response.status(200).json(request.user)
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body as User

    if (!name || !email || !password) {
      throw new BadRequestError('Fill in the fields correctly')
    }

    const userExists: User = await UsersRepository.findByEmail(email)

    if (userExists) {
      throw new BadRequestError('User already exists')
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser: User = await UsersRepository.create(
      name,
      email,
      hashPassword,
    )

    const { password: _, ...user } = newUser

    response.status(201).json(user)
  }

  async update(request: Request, response: Response) {
    const { user } = request
    const { name, email, password } = request.body

    const userValid: User[] = await UsersRepository.findById(user.id)

    if (!userValid) {
      throw new BadRequestError('User invalid')
    }

    const userExists: User = await UsersRepository.findByEmail(email)

    if (userExists) {
      throw new BadRequestError('User already exists')
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const updateUser: User = await UsersRepository.update(
      name,
      email,
      hashPassword,
      user.id,
    )

    const { password: _, ...userUpdated } = updateUser

    response.status(200).json(userUpdated)
  }

  async delete(request: Request, response: Response) {
    const { user } = request

    const deleteUser: User[] = await UsersRepository.findById(user.id)

    if (!deleteUser) {
      throw new NotFoundError('User not found')
    }

    await UsersRepository.delete(user.id)
    response.status(204)
  }
}

export default new UserController()
