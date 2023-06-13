import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (request, response) => {
  response.send('Hello World 🚀')
})

app.listen(3000, () =>
  console.log('🔥 Server started at http://localhost:3000'),
)
