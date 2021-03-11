import http from 'http'
import { Server, Socket } from 'socket.io'

export default (server: http.Server) => {
  const io = new Server(server)

  io.on('connection', (socket: Socket) => {
    // client connected handling
    console.log(`client connected, id: ${socket.id}`)
    const playerList = []

    socket.on('join-room', (name: string) => {
      io.emit('join-room', name)

      playerList.push({id: socket.id, name: name})
    })

    socket.on('disconnect', (reason) => {
      console.log(`client disconnect: ${reason}, id: ${socket.id}`)
    })
  })
}
