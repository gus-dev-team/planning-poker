import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
    default: "",
  },
});

const roomschema = mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
      default: "tap to change the table's theme",
    },
    time: {
      type: Number,
      required: true,
      default: 3600,
    },
    isHidden: {
      type: Boolean,
      required: true,
      default: true,
    },
    players: [playerSchema],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomschema);

export default Room;
