import http from 'http'
import { Server, Socket } from 'socket.io'

export default (server: http.Server) => {
  const io = new Server(server)
  let playerList: any[] = []

  io.on('connection', (socket: Socket) => {
    // client connected handling
    // console.log(`client connected, id: ${socket.id}`)
    socket.emit('player-list', playerList)

    socket.on('join-lobby', (name: string) => {
      socket.broadcast.emit('join-lobby', name)

      playerList = playerList.filter((player) => player.id !== socket.id)
      playerList.push({ id: socket.id, name: name })
      io.emit('player-list', playerList)
    })

    socket.on('left-lobby', (leftPlayer) => {
      console.log(leftPlayer)
    })

    socket.on('disconnect', (reason) => {
      const leftPlayer = playerList.find((player) => player.id === socket.id)
      if (leftPlayer !== undefined) {
        io.emit('left-lobby', leftPlayer)
      }

      playerList = playerList.filter((player) => player !== leftPlayer)
      io.emit('player-list', playerList)
    })
  })
}
