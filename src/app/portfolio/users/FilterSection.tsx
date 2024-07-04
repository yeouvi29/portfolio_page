"use client";

import { useState } from "react";

import Select from "@/app/components/common/Select/Select";
import TextField from "@/app/components/common/TextField/TextField";

const SELECT_OPTIONS = {
  search: ["Name", "Email", "ID"],
  filter: {
    items: ["Membership", "Subscription Plan", "Payment Status"],
    options: {
      membership: ["Active", "Inactive"],
      subscriptionPlan: ["Free", "Basic", "Pro", "Premium"],
      paymentStatus: ["Paid", "Unpaid"],
    },
  },
};
const FilterSection = () => {
  const [searchField, setSearchField] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState<[string, string] | null>(
    null
  );

  const getOptionKey = (item: string) =>
    (item[0].toLowerCase() +
      item
        .slice(1)
        .split(" ")
        .join("")) as keyof typeof SELECT_OPTIONS.filter.options;
  return (
    <form className="py-5">
      <h3>Search User</h3>
      <div className="flex mt-2 gap-1">
        <Select
          label="Category"
          className="w-[200px]"
          items={SELECT_OPTIONS.search}
          selectedItem={searchField}
          onSelect={setSearchField}
        />
        <TextField
          className="flex-grow"
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search user by name, email, or ID"
          // label="Search"
          // helperText={<p className="text-red-600 text-xs">error</p>}
        />
      </div>
      <h3>Filter User</h3>
      <div className="flex mt-2 gap-1">
        <Select
          className="w-[200px]"
          label="Category"
          items={SELECT_OPTIONS.filter.items}
          selectedItem={selectedItem ? selectedItem[0] : ""}
          onSelect={(item) => {
            setSelectedItem(
              item
                ? [item, SELECT_OPTIONS.filter.options[getOptionKey(item)][0]]
                : null
            );
          }}
        />
        <Select
          disabled={!selectedItem}
          label="Value"
          items={
            selectedItem
              ? SELECT_OPTIONS.filter.options[getOptionKey(selectedItem[0])]
              : []
          }
          selectedItem={selectedItem ? selectedItem[1] : ""}
          onSelect={(item) => setSelectedItem((prev) => [prev![0], item])}
        />
        <div className="flex-grow" />
        <button
          type="submit"
          onSubmit={(e) => e.preventDefault()}
          className="bg-blue-500 text-white w-[200px] px-3 py-1 rounded-md hover:bg-blue-500/80"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default FilterSection;
