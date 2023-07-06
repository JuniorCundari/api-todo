import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { UnauthorizedError } from '../helpers/apiError'

import UsersRepository from '../repositories/UsersRepository'

import { User } from '../../models/User'

const TOKEN_KEY = process.env.TOKEN_KEY || ''

interface TokenPayLoad {
  id: string
  iat: number
  exp: number
}

async function authMiddlewares(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers

  if (!authorization) {
    throw new UnauthorizedError('Not authorized')
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, TOKEN_KEY)
    const { id } = data as TokenPayLoad

    const user: User[] = await UsersRepository.findById(id)

    if (!user) {
      throw new UnauthorizedError('Not authorized')
    }

    request.user = user

    return next()
  } catch {
    throw new UnauthorizedError('Invalid token')
  }
}

export default authMiddlewares
