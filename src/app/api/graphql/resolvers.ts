import { getUsers } from "@/db/users";

export const resolvers = {
  Query: {
    users: async (
      _root: any,
      params: {
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
      }
    ) => {
      const userData = await getUsers(params);

      return userData;
    },
  },
};
