import express, { Application, Request, Response } from 'express'

const PORT = process.env.PORT || 5000

const app: Application = express()

app.get('/', (req: Request, res: Response): void => {
  res.send('hello')
})

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`))
