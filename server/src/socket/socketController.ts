import http from 'http'
import { Server, Socket } from 'socket.io'

export default (server: http.Server) => {
  const io = new Server(server)
  let playerList: any[] = []

  io.on('connection', (socket: Socket) => {
    // client connected handling
    // console.log(`client connected, id: ${socket.id}`)
    socket.emit('player-list', playerList)

    socket.on('join-room', (name: string) => {
      io.emit('join-room', name)

      playerList = playerList.filter((player) => player.id !== socket.id)
      playerList.push({ id: socket.id, name: name })
      io.emit('player-list', playerList)
    })

    socket.on('disconnect', (reason) => {
      console.log(`client disconnect: ${reason}, id: ${socket.id}`)

      // filter playerList
      playerList = playerList.filter((player) => player.id !== socket.id)
      io.emit('player-list', playerList)
    })
  })
}
