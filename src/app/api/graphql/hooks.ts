import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";

import { usersQuery, weatherQuery } from "@/lib/graphql/apolloClient/queries";
import { UserEntity } from "@/db/types";
import { formatDate } from "@/../utils";

export const useGetUsers = ({
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
}): [
  typeof getFilteredData,
  {
    loading: boolean;
    error?: ApolloError;
    data: {
      users: UserEntity[] | null;
      totalUsers: number;
    };
  }
] => {
  const [getFilteredData, { loading, error, data }] = useLazyQuery(usersQuery, {
    variables: {
      pagination,
      sort,
      filter,
      search,
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
    return [
      getFilteredData,
      {
        loading,
        error,
        data: { users: newData, totalUsers: data.users.totalUsers },
      },
    ];
  }
  //   console.log(error);
  return [
    getFilteredData,
    { loading, error, data: { users: null, totalUsers: 0 } },
  ];
};

export const useGetWeather = () => {
  const { loading, error, data } = useQuery(weatherQuery);

  return { loading, error, data };
};
