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

const tableSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
      default: "tap to change the issue",
    },
    time: {
      type: Number,
      required: true,
      default: 3600,
    },
    players: [playerSchema],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;

// // RUN THIS ONCE TO CREATE AN ENTRY ON THE DATABASE
// // >> COPY AND PASTE ON SERVER.JS AND RUN NODE.
// await Table.create([
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
