import { connectToDatabase } from "@/lib/mongodb";

const { db } = await connectToDatabase();

export const getUsers = async (limit = 10, offset = 0) => {
  const users = await db
    ?.collection("users")
    .find()
    .limit(limit)
    .skip(offset)
    .toArray();
  console.log("users", users);
  const totalUsers = await db?.collection("users").countDocuments();
  return { users, totalUsers };
};
