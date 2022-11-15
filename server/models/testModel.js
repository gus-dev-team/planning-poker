import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: String,
});

const Test = mongoose.model("Test", tableSchema);

export default Test;

// // RUN THIS ONCE TO CREATE AN ENTRY ON THE DATABASE
// await Test.create([
//   {
//     name: "SUBJECT_0",
//     age: 5,
//     status: "ALIVE",
//   },
//   {
//     name: "SUBJECT_1",
//     age: 8,
//     status: "DEAD",
//   },
//   {
//     name: "SUBJECT_2",
//     age: 13,
//     status: "DEAD",
//   },
// ]);
