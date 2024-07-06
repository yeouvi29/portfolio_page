import { connectToDatabase } from "@/lib/mongodb";

const { db } = await connectToDatabase();

export const getUsers = async ({
  pagination,
  sort,
  filter,
  search,
}: {
  pagination: { limit: number; offset: number };
  sort: {
    item: "name" | "userName" | "email" | "registeredDate" | "lastLogin";
    order: "asc" | "dsc";
  };
  search: { item: string; value: string };
  filter: {
    membershipStatus: "All" | "Active" | "Inactive";
    subscriptionPlan: "All" | "Free" | "Basic" | "Pro";
    paymentStatus: "All" | "Paid" | "Unpaid";
  };
}) => {
  let query: any = {};
  const sortCondition: { [key: string]: 1 | -1 } = {};

  sortCondition[sort.item] = sort.order === "asc" ? 1 : -1;

  if (search.item && search.value) {
    query = {
      $and: [{ [search.item]: { $regex: search.value, $options: "i" } }],
    };
  }

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== "All") {
      query.$and = query.$and ?? [];
      query.$and.push({ [key]: value });
    }
  });

  const users = await db
    ?.collection("users")
    .find(query)
    .sort(sortCondition)
    .limit(pagination.limit || 0)
    .skip(pagination.offset || 0)
    .toArray();

  const totalUsers = await db?.collection("users").countDocuments(query);
  return { users, totalUsers };
};
