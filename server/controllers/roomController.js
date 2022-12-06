import Room from "../models/roomModel.js";

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
    const { ID } = req.params;
    const data = await Room.find({});
    const specificRoom = data.find((room) => room.id === ID);
    res.status(200).json(specificRoom);
  } catch (err) {
    console.error(err);
  }
};

const setTheme = async function (req, res) {
  await Room.updateOne(
    { id: req.params.roomID },
    { $set: { theme: req.body.theme } }
  );
  res.status(200).send({ success: true, data: [] });
};

export { createNewRoom, getRoomData, setTheme };
