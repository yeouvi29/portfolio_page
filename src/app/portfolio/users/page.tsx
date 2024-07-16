"use client";

import UserTable from "./UserTable";
import Pagination from "@/app/components/common/Pagination/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetUsers } from "@/app/api/graphql/hooks";
import FilterSection from "./FilterSection";
import { List } from "postcss/lib/list";
const LIMIT = 20;

export interface ListControlStateType {
  currentPage: number;
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
const Page = () => {
  const [listControlState, setListControlState] =
    useState<ListControlStateType>({
      currentPage: 1,
      sort: { item: "registeredDate", order: "dsc" },
      search: { item: "", value: "" },
      filter: {
        membershipStatus: "All",
        subscriptionPlan: "All",
        paymentStatus: "All",
      },
    });

  const [getFilteredData, { loading, error, data }] = useGetUsers({
    pagination: {
      limit: LIMIT,
      offset: LIMIT * (listControlState.currentPage - 1),
    },
    sort: listControlState.sort,
    search: listControlState.search,
    filter: listControlState.filter,
  });

  const totalPageRef = useRef<number | undefined>(undefined);
  const totalPages = useMemo(() => {
    if (loading && totalPageRef.current) {
      return totalPageRef.current;
    }
    if (data) {
      const newTotalPages = Math.ceil(data.totalUsers / LIMIT);
      totalPageRef.current = newTotalPages;
      return newTotalPages;
    }
    return 0;
  }, [data]);

  const handleSort = ({
    item,
    order,
  }: {
    item: ListControlStateType["sort"]["item"];
    order: ListControlStateType["sort"]["order"];
  }) => {
    if (
      item === listControlState.sort.item &&
      order === listControlState.sort.order
    ) {
      return;
    }

    setListControlState((prev) => ({
      ...prev,
      currentPage: 1,
      sort: { item, order },
    }));
  };

  const handleSearch = ({
    search,
    filter,
  }: {
    search: ListControlStateType["search"];
    filter: ListControlStateType["filter"];
  }) => {
    setListControlState((prev) => ({
      ...prev,
      currentPage: 1,
      search,
      filter,
    }));
    getFilteredData({
      variables: {
        pagination: {
          limit: LIMIT,
          offset: LIMIT * (listControlState.currentPage - 1),
        },
        sort: listControlState.sort,
        search: listControlState.search,
        filter: listControlState.filter,
      },
    });
  };

  useEffect(() => {
    const { currentPage, sort, search, filter } = listControlState;

    getFilteredData({
      variables: {
        pagination: {
          limit: LIMIT,
          offset: LIMIT * (currentPage - 1),
        },
        sort: sort,
        search: search,
        filter: filter,
      },
    });
  }, [listControlState]);

  return (
    <div className="flex-grow">
      <h1>Users</h1>
      <div className="w-fit max-w-[calc(100vw-40px)] md:max-w-[calc(100vw-290px)] mt-5">
        <FilterSection disabled={loading} updateSearchTerms={handleSearch} />
        <UserTable
          loading={loading}
          data={data.users}
          updateSort={handleSort}
          sortingItem={listControlState.sort}
        />
        <div className="pt-4">
          {totalPages !== 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={listControlState.currentPage}
              onClickPage={(updatedPage) =>
                setListControlState((prev) => ({
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
