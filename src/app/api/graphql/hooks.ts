import { usersQuery } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../../../utils";
import { UserEntity } from "@/db/types";

export const useGetUsers = (params: {
  limit: number;
  offset: number;
  sortField: "name" | "userName" | "email" | "registeredDate" | "lastLogin";
  order: "asc" | "dsc";
}) => {
  const { loading, error, data } = useQuery(usersQuery, {
    variables: {
      limit: params.limit,
      offset: params.offset,
      sortField: params.sortField,
      order: params.order,
    },
  });
  let newData: UserEntity[] = [];
  if (data && data.users) {
    newData = data.users.users.map((user: any) => {
      return {
        ...user,
        registeredDate: formatDate(user.registeredDate),
        lastLogin: formatDate(user.lastLogin),
      };
    });
    return {
      loading,
      error,
      data: { users: newData, totalUsers: data.users.totalUsers },
    };
  }
  return { loading, error, data: { users: null, totalUsers: 0 } };
};
