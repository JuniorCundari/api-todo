import { Request, Response, NextFunction } from 'express'

const PORT_ORIGIN = process.env.PORT_ORIGIN

export default (request: Request, response: Response, next: NextFunction) => {
  response.setHeader(
    'Access-Control-Allow-Origin',
    `http://localhost:${PORT_ORIGIN}`,
  )
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  )
  response.setHeader('Access-Control-Max-Age', '7200')
  response.setHeader('Access-Control-Allow-Credentials', 'true')

  if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    )
    response.setHeader('Access-Control-Max-Age', '86400')

    response.sendStatus(204)
  } else {
    next()
  }
}
