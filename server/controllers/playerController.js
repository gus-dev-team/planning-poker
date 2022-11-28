import mongoose from "mongoose";
import Room from "../models/roomModel.js";

const pushToPlayers = async function (req, res) {
  const { ID, name } = req.body;

  await Room.updateOne(
    { ID: req.params.roomID },
    { $push: { players: { ID, name } } }
  );

  res.status(201).send({ success: true, data: [] });
};

const pullFromPlayers = async function (req, res) {
  console.log(req.params, req.body);
  const { ID } = req.body;
  await Room.updateOne(
    { ID: "testing" },
    {
      $pull: {
        players: {
          ID: ID,
        },
      },
    }
  ).exec(); // This is necessary.

  res.status(200).send({ success: true, data: [] });
};

// [UNDER CONSTRUCTION]
// The idea here is to check what the current value of the card property is before changing it.
// If the current value differ from the new value, then the value should be updated to the new value as one would expect.
// BUT! If the current value equals the new value, then it should update to the empty string instead.
// This will act as if the player would be canceling their vote.
// My difficulty at the momment is HOW to retrieve the current card value from the database.
const setCard = async function (req, res) {
  // console.log(req.params, req.body);

  // const currentPlayer = await Room.findOne({
  //   ID: req.params.ID,
  //   players: { ID: req.params.playerID },
  // });
  // console.log(currentPlayer);

  await Room.updateOne(
    { ID: req.params.ID, "players.ID": req.params.playerID },
    {
      $set: {
        "players.$.card": req.body.card,
      },
    }
  );
  res.status(201).send({ success: true, data: [] });
};

export { setCard, pushToPlayers, pullFromPlayers };
