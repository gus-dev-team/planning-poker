import Room from "../models/roomModel.js";
import { updateOneCard } from "./playerController.js";

const createNewRoom = async function (req, res) {
  const newRoom = new Room();
  await newRoom.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send({ redirect: `/rooms/${newRoom.id}` });
    }
  });
};

// const deleteRoom = async function (req, res) {}

const getRoomData = async function (req, res) {
  try {
    const room = await Room.findById(req.params.ID);
    res.status(200).json(room);
  } catch (err) {
    console.error(err);
  }
};

const setTheme = async function (req, res) {
  await Room.findByIdAndUpdate(req.params.roomID, {
    $set: { theme: req.body.theme },
  });

  res.status(200).send({ success: true, data: [] });
};

const resetTable = async function (req, res) {
  const data = await Room.find({
    id: req.params.roomID,
    players: { $elemMatch: { card: { $ne: "" } } },
  });

  const players = data[0] && data[0].players;
  if (players) {
    for (const player of players) {
      await updateOneCard(req.params.roomID, player.ID, "");
    }
  }
  res.status(200).send({ success: true, data: [] });
};

const setIsHidden = async function (req, res) {
  await Room.findByIdAndUpdate(req.params.roomID, {
    $set: { isHidden: req.body.isHidden },
  });
  res.status(200).send({ success: true, data: [] });
};

export { createNewRoom, getRoomData, setTheme, resetTable, setIsHidden };
