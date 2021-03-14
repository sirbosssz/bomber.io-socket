import { io } from 'socket.io-client'

const socket = io('http://172.16.10.109:5000/', {
  path: '/socket'
})
export default socket