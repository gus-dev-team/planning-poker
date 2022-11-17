// §TEST
import Test from "./testModel.js";
import express from "express";
import { isObjectIdOrHexString } from "mongoose";
const testingRouter = express.Router();

testingRouter.get("/", async (req, res) => {
  try {
    const data = await Test.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

testingRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newTestSubject = new Test(req.body);
  await newTestSubject.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  res.status(201).send({ success: true, data: [] });
});

export default testingRouter;
