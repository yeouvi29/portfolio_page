import Select from "@/app/components/common/Select/Select";
import { useState } from "react";

const FilterSection = () => {
  const [searchField, setSearchField] = useState<string>("Name");
  return (
    <div>
      <div>
        <h3>Search User</h3>
        <div className="flex">
          <Select
            label="Category"
            items={["Name", "Email", "ID", "Any"]}
            selectedItem={searchField}
            onSelect={setSearchField}
          />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};
export default FilterSection;
