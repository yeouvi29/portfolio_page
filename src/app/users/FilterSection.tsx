"use client";

import { FormEvent, useState } from "react";

import Select from "@/components/common/Select/Select";
import TextField from "@/components/common/TextField/TextField";

import { ListControlStateType } from "./page";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";

import styles from "./styles.module.css";

const SELECT_OPTIONS = {
  search: [
    { displayName: "Name", apiField: "name" },
    { displayName: "Email", apiField: "email" },
    { displayName: "ID", apiField: "userName" },
  ],
  filter: [
    {
      displayName: "Membership",
      apiField: "membershipStatus",
      options: ["All", "Active", "Inactive"],
    },
    {
      displayName: "Subscription Plan",
      apiField: "subscriptionPlan",
      options: ["All", "Free", "Basic", "Pro"],
    },
    {
      displayName: "Payment Status",
      apiField: "paymentStatus",
      options: ["All", "Paid", "Unpaid"],
    },
  ],
};

const FilterSection = ({
  disabled,
  updateSearchTerms,
}: {
  disabled: boolean;
  updateSearchTerms: ({
    search,
    filter,
  }: {
    search: ListControlStateType["search"];
    filter: ListControlStateType["filter"];
  }) => void;
}) => {
  const { isUpOrEqual } = useBreakpoint();
  const [searchField, setSearchField] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilteringItems, setSelectedFilteringItems] = useState<
    ListControlStateType["filter"]
  >({
    membershipStatus: "All",
    subscriptionPlan: "All",
    paymentStatus: "All",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSearchTerms({
      search: {
        item: searchField
          ? SELECT_OPTIONS.search.filter(
              (i) => i.displayName === searchField
            )[0].apiField
          : "",
        value: searchInput,
      },
      filter: selectedFilteringItems,
    });
  };
  const isMobile = !isUpOrEqual("md");
  return (
    <form className="py-5" onSubmit={handleSubmit}>
      <h3 className="text-2xl text-gray-500">Search User</h3>
      <div className="flex mt-2 gap-1">
        <Select
          disabled={disabled}
          label="Category"
          className={clsx(styles.filter, "w-[150px] lg:w-[200px]")}
          items={Object.values(SELECT_OPTIONS.search).map(
            (item) => item.displayName
          )}
          selectedItem={searchField}
          onSelect={setSearchField}
        />
        <TextField
          className="flex-grow"
          disabled={disabled || !searchField}
          value={searchInput}
          onChange={setSearchInput}
          placeholder={
            isMobile ? "Search user" : "Search user by name, email, or ID"
          }
          // label="Search"
          // helperText={<p className="text-red-600 text-xs">error</p>}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl text-gray-500">Filter By</h3>
        <div className="flex flex-col lg:flex-row mt-2 gap-2 lg:gap-1">
          {SELECT_OPTIONS.filter.map((item, i) => {
            return (
              <div key={item.displayName}>
                {/* <p>{item.displayName}</p> */}
                <Select
                  label={item.displayName}
                  disabled={disabled}
                  defaultValue="All"
                  className={clsx(styles.filter, "w-full lg:w-[200px]")}
                  items={item.options}
                  selectedItem={
                    selectedFilteringItems[
                      item.apiField as keyof typeof selectedFilteringItems
                    ]
                  }
                  onSelect={(selectedValue) =>
                    setSelectedFilteringItems((prev) => ({
                      ...prev,
                      [item.apiField]: selectedValue,
                    }))
                  }
                />
              </div>
            );
          })}

          <div className="flex-grow hidden lg:block" />
          <button
            type="submit"
            disabled={disabled}
            className="h-[42px] bg-blue-500 text-white w-full lg:w-[200px] px-3 py-1 rounded-md hover:bg-blue-500/80"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
export default FilterSection;
