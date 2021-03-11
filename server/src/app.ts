import express, { Application, Request, Response } from 'express'
import http, { createServer } from 'http'

import router from './router'

const SOCKET_PORT = process.env.SOCKET_PORT || 5000
const API_PORT = process.env.API_PORT || 5500

const app: Application = express()
const server = createServer(app)
router(app)

app.listen(API_PORT, () => {
  console.log(`Server API running on localhost:${API_PORT}`)
})

server.listen(SOCKET_PORT, () => {
  console.log(`Server socket running on localhost:${SOCKET_PORT}`)
})
