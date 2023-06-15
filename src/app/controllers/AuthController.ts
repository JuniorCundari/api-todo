import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UsersRepository from '../repositories/UsersRepository'

const TOKEN_KEY = process.env.TOKEN_KEY

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UsersRepository.findByEmail(email)

    if (!user) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({ id: user.id }, `${TOKEN_KEY}`, { expiresIn: '1d' })

    delete user.password

    return response.json({
      user,
      token,
    })
  }
}

export default new AuthController()
