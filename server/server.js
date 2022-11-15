import express from "express";
import connectToDatabase from "./database/database.js";
import logger from "./utils/logger.js";
import Table from "./models/tableModel.js";
import Test from "./models/testModel.js";

connectToDatabase();

const server = express();

server.use(express.urlencoded({ extended: false })); // Why use this?
server.use(express.json()); // JSON parser.
server.use(logger);

server.get("/", (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

server.get("/api/tests", async (req, res) => {
  try {
    const data = await Test.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

server.post("/api/tests", async (req, res) => {
  console.log(req.body);
  const newTestSubject = new Test(req.body);
  await newTestSubject.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  res.send({ success: true, data: [] });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
