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

// // RUN THIS ONCE TO CREATE AN ENTRY ON THE DATABASE
// // >> COPY AND PASTE ON SERVER.JS AND RUN NODE.
// await Room.create([
//   {
//     ID: "023",
//     issue: "How hard can this be?!",
//     time: 3600,
//     players: [
//       { ID: "23", name: "Daniel" },
//       { ID: "0", name: "Mariana" },
//     ],
//   },
// ]);

// Quando você se foi, ativou uma parte de mim que estava dormente.
// Uma luz na escuridão que eu prometo seguir até a fonte.
// Esse é o meu caminho iluminado, meu destino agora.
