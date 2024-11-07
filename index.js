import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });

//   io.on("connection", (socket) => {
//     socket.on("hello", (arg) => {
//       console.log(arg); // 'world'
//     });
//   });

  io.on('connection', (socket) => {
    socket.on('hello', (arg1, arg2, arg3) => {
      console.log(arg1); // 1
      console.log(arg2); // '2'
      console.log(arg3); // { 3: '4', 5: <Buffer 06> }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port:`, port);
  connectDB();
});
