"use client";

import { useQuery } from "@apollo/client";
import UserTable from "./UserTable";
import { usersQuery } from "@/lib/graphql/queries";
import Pagination from "@/app/components/ui/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useGetUsers } from "@/app/api/graphql/hooks";
const LIMIT = 20;

export interface SortingItemType {
  item: "name" | "userName" | "email" | "registeredDate" | "lastLogin";
  order: "asc" | "dsc";
  currentPage: number;
}
const Page = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [sortingItem, setSortingItem] = useState<SortingItemType>({
    item: "registeredDate",
    order: "dsc",
    currentPage: 1,
  });
  const { loading, error, data } = useGetUsers({
    limit: LIMIT,
    offset: LIMIT * (sortingItem.currentPage - 1),
    sortField: sortingItem.item,
    order: sortingItem.order,
  });

  useEffect(() => {
    if (totalPages) {
      return;
    }
    if (data) {
      setTotalPages(Math.ceil(data.totalUsers / LIMIT));
    }
  }, [data]);

  return (
    <div className="flex-grow">
      <h1 className="text-2xl">Users</h1>
      <div className="w-fit max-w-[calc(100vw-40px)] md:max-w-[calc(100vw-290px)] mt-5">
        <UserTable loading={loading} data={data.users} updateSort={setSortingItem} />
        <div className="pt-4">
          {totalPages !== undefined && (
            <Pagination
              totalPages={totalPages}
              currentPage={sortingItem.currentPage}
              onClickPage={(updatedPage) =>
                setSortingItem((prev) => ({
                  ...prev,
                  currentPage: updatedPage,
                }))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
