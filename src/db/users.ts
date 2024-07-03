import { connectToDatabase } from "@/lib/mongodb";

const { db } = await connectToDatabase();

export const getUsers = async (
  limit: number,
  offset: number,
  sortField?: "name" | "userName" | "email" | "registeredDate" | "lastLogin",
  order?: "asc" | "desc"
) => {
  const sortCondition: { [key: string]: 1 | -1 } = {};
  if (sortField) {
    sortCondition[sortField] = order === "asc" ? 1 : -1;
  }
  const users = await db
    ?.collection("users")
    .find()
    .sort(sortCondition)
    .limit(limit || 0)
    .skip(offset || 0)
    .toArray();
  console.log("users", users);
  const totalUsers = await db?.collection("users").countDocuments();
  return { users, totalUsers };
};
