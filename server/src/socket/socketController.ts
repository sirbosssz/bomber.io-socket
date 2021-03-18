import http from 'http'
import { Server, Socket } from 'socket.io'

import { randArr } from '../functions/random'

export default (server: http.Server) => {
  const io = new Server(server, {
    path: '/socket',
    cors: {
      origin: 'http://localhost:8000',
      methods: ['GET', 'POST'],
    },
  })
  let playerList: any[] = []
  let playerSpawn: number[] = []

  io.on('connection', (socket: Socket) => {
    // client connected handling
    socket.emit('player-list', playerList)

    socket.on('join-lobby', (name: string) => {
      socket.broadcast.emit('join-lobby', name)

      playerList = playerList.filter((player) => player.id !== socket.id)
      playerList.push({ id: socket.id, name: name })
      io.emit('player-list', playerList)
    })

    socket.on('left-lobby', (leftPlayer) => {
      playerList = playerList.filter((player) => player.id !== leftPlayer.id)
      io.emit('player-list', playerList)
      io.emit('left-lobby', leftPlayer)
    })

    socket.on('game-start', (state) => {
      io.emit('game-start', state)
    })

    socket.on('get-spawn-list', (state) => {
      if (playerSpawn.length <= 0) {
        playerSpawn = randArr(playerList.length)
      }
      socket.emit('spawn-list', playerSpawn)
    })

    socket.on('disconnect', (reason) => {
      const leftPlayer = playerList.find((player) => player.id === socket.id)
      if (leftPlayer !== undefined) {
        io.emit('left-lobby', leftPlayer)
      }

      playerList = playerList.filter((player) => player !== leftPlayer)
      io.emit('player-list', playerList)

      if (playerList.length <= 0) {
        playerSpawn = []
      }
    })
  })
}
