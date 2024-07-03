"use client";

import UserTable from "./UserTable";
import Pagination from "@/app/components/common/Pagination/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetUsers } from "@/app/api/graphql/hooks";
import FilterSection from "./FilterSection";
const LIMIT = 20;

export interface SortingItemType {
  item: "name" | "userName" | "email" | "registeredDate" | "lastLogin";
  order: "asc" | "dsc";
  currentPage: number;
}
const Page = () => {
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
  const totalPageRef = useRef<number | undefined>(undefined);
  const totalPages = useMemo(() => {
    if (loading && totalPageRef.current) {
      return totalPageRef.current;
    }
    if (data) {
      return Math.ceil(data.totalUsers / LIMIT);
    }
    return 0;
  }, [data]);
  const handleSort = ({
    item,
    order,
  }: {
    item: SortingItemType["item"];
    order: SortingItemType["order"];
  }) => {
    if (item === sortingItem.item && order === sortingItem.order) {
      return;
    }
    setSortingItem({
      currentPage: 1,
      item,
      order,
    });
  };

  useEffect(() => {
    if (totalPageRef.current) {
      return;
    }
    if (data) {
      totalPageRef.current = Math.ceil(data.totalUsers / LIMIT);
    }
  }, [data]);

  return (
    <div className="flex-grow">
      <h1 className="text-2xl">Users</h1>
      <div className="w-fit max-w-[calc(100vw-40px)] md:max-w-[calc(100vw-290px)] mt-5">
        <FilterSection />
        <UserTable
          loading={loading}
          data={data.users}
          updateSort={handleSort}
          sortingItem={sortingItem}
        />
        <div className="pt-4">
          {totalPages !== 0 && (
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
