"use client";

import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

import PopOver from "../../common/PopOver/PopOver";
import styles from "./styles.module.css";

interface SortPopOverProps {
  label?: string;
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
}
const SelectTitle = ({
  label,
  isOptionShow,
  defaultValue,
  selectedItem,
}: {
  label?: string;
  isOptionShow: boolean;
  defaultValue: string;
  selectedItem?: string;
}) => {
  return (
    <div className="min-w-[120px] max-w-[200px] p-2 flex justify-between items-center relative bg-white border border-gray-300 rounded-md cursor-pointer">
      {label && (
        <div
          className={clsx(
            "absolute left-2 top-0  px-1 -translate-y-1/2 z-10 text-xs text-gray-600",
            styles.selectTitle
          )}
        >
          {label}
        </div>
      )}
      <p>{selectedItem || defaultValue}</p>
      {isOptionShow ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
};

const Select = ({ label, items, onSelect, selectedItem }: SortPopOverProps) => {
  const [isOptionShow, setIsOptionShow] = useState(false);

  return (
    <PopOver
      className="z-20"
      parent={
        <SelectTitle
          label={label}
          isOptionShow={isOptionShow}
          defaultValue="Name"
          selectedItem={selectedItem}
        />
      }
      isPopOverShow={isOptionShow}
      handlePopOverVisibility={(show) => setIsOptionShow(show)}
    >
      <div className="w-[102px] flex flex-col">
        {items.map((item) => (
          <div
            key={item}
            className={clsx(
              "min-w-max p-2 font-normal rounded-md hover:bg-gray-200 flex justify-between items-center cursor-pointer",
              selectedItem === item &&
                "bg-blue-100 text-blue-600 hover:bg-blue-100"
            )}
            onClick={() => {
              onSelect(item);
              setIsOptionShow(false);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </PopOver>
  );
};

export default Select;
