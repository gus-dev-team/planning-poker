import express from "express";
import connectToDatabase from "./database/database.js";
import logger from "./utils/logger.js";
import Table from "./models/tableModel.js";

import { createServer } from "http";
import { Server } from "socket.io";

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

// §TEST
import testingRouter from "./testing/testingRouter.js";
app.use("/api/tests/", testingRouter);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on("post!", () => {
    console.log(`hello from ${socket.id}`);
    io.emit("message", "message received"); // troquei io por socket... ??? será que vai dar pau?
  });

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

// io.listen(5000);

// setInterval(() => {
//   io.emit("message", new Date().toISOString());
// }, 1000);
