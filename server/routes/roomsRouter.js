import express from "express";
import Room from "../models/roomModel.js";

import {
  pushToPlayers,
  pullFromPlayers,
  setCard,
} from "../controllers/playerController.js";
import {
  createNewRoom,
  getRoomData,
  setTheme,
  resetTable,
  setIsHidden,
} from "../controllers/roomController.js";

const roomsRouter = express.Router();

// Retrieve the rooms' collection data.
roomsRouter.get("/", async (req, res) => {
  // This is here for testing purposes.
  try {
    const data = await Room.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

roomsRouter.get("/new", createNewRoom);

roomsRouter.get("/:ID", getRoomData);

roomsRouter.put("/:roomID/theme", setTheme);

roomsRouter.put("/:roomID/reset", resetTable);

roomsRouter.put("/:roomID/hidden", setIsHidden);

roomsRouter.put("/:roomID", pushToPlayers);

roomsRouter.delete("/:roomID", pullFromPlayers);

roomsRouter.put("/:ID/:playerID", setCard);

export default roomsRouter;
