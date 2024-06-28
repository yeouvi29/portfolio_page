import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_DB = "admin_page";
export let client: null | MongoClient = null;

export const connectToDatabase = async () => {
  if (client) {
    return { error: null, db: client.db(ADMIN_DB) };
  }
  if (!MONGODB_URI) {
    console.log("MongoDB URI not found");
    return { error: { message: "MongoDB URI not found" }, db: null };
  }
  try {
    client = new MongoClient(MONGODB_URI);
    console.log("Connected to MongoDB successfully.");
    await client.connect();
    const photoDB = client.db(ADMIN_DB);
    return { error: null, db: photoDB };
  } catch (error) {
    console.error("Error connecting to the database", error);
    return { error: { message: (error as Error).message }, db: null };
  }
};

if (process.env.NODE_ENV !== "production") {
  process.on("SIGINT", async () => {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
      process.exit();
    }
  });
}
