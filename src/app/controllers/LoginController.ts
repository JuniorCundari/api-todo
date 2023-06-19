import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UsersRepository from '../repositories/UsersRepository'

import { BadRequestError } from '../helpers/apiError'

const TOKEN_KEY = process.env.TOKEN_KEY ?? ''

class LoginController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body

    const user = await UsersRepository.findByEmail(email)

    if (!user) {
      throw new BadRequestError('E-mail or password invalid')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new BadRequestError('E-mail or password invalid')
    }

    const token = jwt.sign({ id: user.id }, TOKEN_KEY, { expiresIn: '1d' })

    const { password: _, ...userLogin } = user

    return response.json({
      userLogin,
      token,
    })
  }
}

export default new LoginController()
