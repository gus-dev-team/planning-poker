import mongoose from "mongoose";
import Room from "../models/roomModel.js";
import io from "../server.js";

const createNewRoom = async function (req, res) {
  const newRoom = new Room();
  await newRoom.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      // res.status(302).redirect(`/api/rooms/${newRoom.id}`); // doesnt work
      res.send({ redirect: `/rooms/${newRoom.id}` });
    }
  });

  // console.log("This is the new room ID...", newRoom.id);

  io.emit("update");
  // res.status(200).json({ success: true, data: [] });
};

// const deleteRoom = async function (req, res) {}

const getRoomData = async function (req, res) {
  try {
    const { ID } = req.params;
    const data = await Room.find({});
    const specificRoom = data.find((room) => room.id === ID);
    // changed room.ID to room.id
    res.status(200).json(specificRoom);
  } catch (err) {
    console.error(err);
  }
};

const setTheme = async function (req, res) {
  console.log(req.params, req.body);
  await Room.updateOne(
    { id: req.params.roomID }, // changed ID to id
    { $set: { theme: req.body.theme } }
  );
  res.status(200).send({ success: true, data: [] });
};

export { createNewRoom, getRoomData, setTheme };
