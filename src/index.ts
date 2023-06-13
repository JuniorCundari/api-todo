import express from 'express'
import 'dotenv/config'

import routes from './routes'

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000, () =>
  console.log(`🔥 Server started at http://localhost:${PORT}`),
)
