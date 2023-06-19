import { Request, Response, NextFunction } from 'express'

const PORT = process.env.PORT

export default (request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`)
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Max-Age', '7200')
  next()
}
