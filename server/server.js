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

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  socket.on("join socket.io room", (roomID) => {
    console.log("User has joined the room with ID", roomID);
    socket.join(roomID);
    io.emit("update");
  });

  socket.on("update", (roomID) => {
    console.log("Server received update event!");
    io.to(roomID).emit("update");
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

export default io;
