import express from 'express'
import 'express-async-errors'
import 'dotenv/config'

import routes from './routes'
import errorHandler from './app/middlewares/errorHandler'
import cors from './app/middlewares/cors'

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors)
app.use(routes)
app.use(errorHandler)

app.listen(`${PORT}`, () =>
  console.log(`🔥 Server started at http://localhost:${PORT}`),
)
