import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    await client.connect();

    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error);
  }
};

let db = client.db("test");

export default db;
