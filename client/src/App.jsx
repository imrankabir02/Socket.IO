import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3000")

function App() {

  const [message, setMessage] = useState("")
  const [messageReceive, setMessageReceive] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", {
      message, room
    })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceive(data.message)
    })
  }, [socket])

  return (
    <>
      <div>
        <input type="text"
          placeholder='Room no..'
          onChange={(e) => {
            setRoom(e.target.value)
          }}
        />
        <button onClick={joinRoom}>
          Join Room
        </button>

      </div>
      <div>

        <input type="text"
          placeholder='Message...'
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <button onClick={sendMessage}>Send</button>
        <h1>Message:</h1>
        {messageReceive}
      </div>
    </>
  )
}

export default App
