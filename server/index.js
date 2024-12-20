import express from "express"
import http from "http"
import {Server} from "socket.io"
import cors from "cors"

const app = express()
const server = http.createServer(app)
app.use(cors())

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST']
    }
})

io.on("connect", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message",  data)
    })
})

server.listen(3000, () => {
    console.log("Server is running..")
})
