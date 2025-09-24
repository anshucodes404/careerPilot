import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// async function connectDB(){
//     try {
//        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)

//        console.log(connectionInstance)
//        console.log(`MongoDB connected successfully ${connectionInstance.connection.host}`)

//     } catch (error) {
//         throw new error("MongoDB connection failed: ", error)
//         process.exit(1)
//     }
// }

//In the above codeBlock process.exit(1) will not run because throw stops the further execution of program

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    ); //consoles the host where my db is being hosted
  } catch (error) {
    console.log("MongoDB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
