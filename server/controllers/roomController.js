import mongoose from "mongoose";
import Room from "../models/roomModel.js";

const createNewRoom = async function (req, res) {
  const { ID } = req.body;
  const newRoom = new Room({ ID: ID });
  await newRoom.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  io.emit("update", `New room created!`);
  res.status(200).json({ success: true, data: [] });
};

const getRoomData = async function (req, res) {
  try {
    const { ID } = req.params;
    const data = await Room.find({});
    const specificRoom = data.find((room) => room.ID === ID);
    res.status(200).json(specificRoom);
  } catch (err) {
    console.error(err);
  }
};

const setTheme = async function (req, res) {
  console.log(req.params, req.body);
  await Room.updateOne(
    { ID: req.params.roomID },
    { $set: { theme: req.body.theme } }
  );
  res.status(200).send({ success: true, data: [] });
};

export { createNewRoom, getRoomData, setTheme };
