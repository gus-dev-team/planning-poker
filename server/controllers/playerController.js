import Room from "../models/roomModel.js";

const pushToPlayers = async function (req, res) {
  const { ID, name } = req.body;

  await Room.findByIdAndUpdate(req.params.roomID, {
    $push: { players: { ID, name } },
  });

  res.status(201).send({ success: true, data: [] });
};

const pullFromPlayers = async function (req, res) {
  const { ID } = req.body;
  await Room.findByIdAndUpdate(req.params.roomID, {
    $pull: {
      players: {
        ID: ID,
      },
    },
  }).exec(); // This is necessary.

  res.status(200).send({ success: true, data: [] });
};

// [UNDER CONSTRUCTION]
// The idea here is to check what the current value of the card property is before changing it.
// If the current value differ from the new value, then the value should be updated to the new value as one would expect.
// BUT! If the current value equals the new value, then it should update to the empty string instead.
// This will act as if the player would be canceling their vote.
// My difficulty at the momment is HOW to retrieve the current card value from the database.
const setCard = async function (req, res) {
  updateOneCard(req.params.ID, req.params.playerID, req.body.card);
  res.status(201).send({ success: true, data: [] });
};

const updateOneCard = async function (roomID, playerID, card) {
  const room = await Room.updateOne(
    { id: roomID, "players.ID": playerID },
    {
      $set: {
        "players.$.card": card,
      },
    }
  );
  console.log("This is the room data:", room); // This data is weird.
};

export { updateOneCard, setCard, pushToPlayers, pullFromPlayers };
