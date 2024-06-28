import { getUsers } from "@/db/users";

export const resolvers = {
  Query: {
    users: async (
      _root: any,
      { limit, offset }: { limit: number; offset: number }
    ) => {
      const userData = await getUsers(limit, offset);
      console.log("userData", userData);
      return userData;
    },
  },
};
