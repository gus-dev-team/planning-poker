import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    //database Name
    const database = "GusDev_PP";
    const setup = await mongoose.connect(
      `mongodb://127.0.0.1:27017/${database}`,
      {}
    );
    console.log(`Database connected : ${setup.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDatabase;
