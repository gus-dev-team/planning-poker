import express from "express";
import connectToDatabase from "./database/database.js";
import logger from "./utils/logger.js";
import { createServer } from "http";
import { Server } from "socket.io";
import roomsRouter from "./routes/roomsRouter.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

connectToDatabase();

app.use(express.urlencoded({ extended: false })); // Why use this?
app.use(express.json()); // JSON parser.
app.use(logger);
app.use("/api/rooms/", roomsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

let socketTotal = 0;

io.on("connection", (socket) => {
  socketTotal += 1;
  console.log("Total number of sockets: ", socketTotal);

  socket.on("disconnect", () => {
    socketTotal -= 1;
    console.log("Total number of sockets: ", socketTotal);
  });

  socket.on("update", () => {
    io.emit("update");
  });

  socket.on("join server room", (roomID) => {
    console.log("user has joined the room", roomID);
    socket.join(roomID);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`socket.io room ${room} was created`);
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

export default io;
