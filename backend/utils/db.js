import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
});

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
