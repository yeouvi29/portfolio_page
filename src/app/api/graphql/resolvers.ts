import { getUsers } from "@/db/users";

export const resolvers = {
  Query: {
    users: async (
      _root: any,
      {
        limit,
        offset,
        sortField,
        order,
      }: {
        limit: number;
        offset: number;
        sortField?:
          | "name"
          | "userName"
          | "email"
          | "registeredDate"
          | "lastLogin";
        order?: "asc" | "desc";
      }
    ) => {
      const userData = await getUsers(limit, offset, sortField, order);

      return userData;
    },
  },
};
