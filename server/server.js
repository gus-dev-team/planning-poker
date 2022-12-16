import express from "express";
import connectToDatabase from "./database/database.js";
import logger from "./utils/logger.js";
import Table from "./models/tableModel.js";
import { nanoid } from "nanoid";
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

// §TEST //////////////////////////////////////////////
import testingRouter from "./testing/testingRouter.js";
app.use("/api/tests/", testingRouter); ////////////////
///////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

// get tables list
app.get("/api/tables/", async (req, res) => {
  try {
    const data = await Table.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

// creates new table...
app.post("/api/tables/new", async (req, res) => {
  const { ID } = req.body;
  const newTable = new Table({ ID: ID });
  await newTable.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  io.emit("update", `update signal`);
  res.status(200).json({ success: true, data: [] });
});

app.get("/api/tables/:ID", async (req, res) => {
  try {
    const { ID } = req.params;
    const data = await Table.find({});
    const specificTable = data.find((table) => table.ID === ID);
    res.status(200).json(specificTable);
  } catch (err) {
    console.error(err);
  }
});

// updates the player list...
app.post("/api/tables/:ID", async (req, res) => {
  const { ID, name, card } = req.body;

  await Table.updateOne(
    { ID: req.params.ID },
    { $push: { players: { ID, name, card } } }
  );

  res.status(201).send({ success: true, data: [] });
});

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on("update-players", () => {
    console.log(`update signal: ${socket.id}...`);
    io.emit("update", `update signal`);
  });

  // §TEST
  socket.on("post!", () => {
    console.log(`hello from ${socket.id}`);
    io.emit("message", "message received..."); // I've switch 'socket.emit' to 'io.emit' and everything worked.
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
