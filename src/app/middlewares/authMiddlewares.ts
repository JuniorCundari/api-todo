import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const TOKEN_KEY = process.env.TOKEN_KEY

interface TokenPayLoadProps {
  id: string
  iat: number
  exp: number
}

export default function authMiddlewares(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers

  if (!authorization) {
    return response.sendStatus(401)
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, `${TOKEN_KEY}`)

    const { id } = data as TokenPayLoadProps

    request.userId = id

    return next()
  } catch {
    return response.sendStatus(401)
  }
}
