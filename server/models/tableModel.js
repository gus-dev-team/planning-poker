import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  UUID: {
    type: String,
    required: true,
  },
});

const tableSchema = mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
      default: "tap to change the issue",
    },
    time: {
      type: String,
      required: true,
      default: "3600",
    },
    players: [playerSchema],
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;

// // RUN THIS ONCE TO CREATE AN ENTRY ON THE DATABASE
// await Table.create([
//   {
//     issue: "my issue",
//     time: "3600",
//     players: [{ name: "Daniel", UUID: "23" }],
//   },
// ]);
