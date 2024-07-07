"use client";

import { CSSProperties, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

import PopOver from "../../common/PopOver/PopOver";
import styles from "./styles.module.css";

interface SelectProps {
  className?: string;
  label?: string;
  items: string[];
  disabled?: boolean;
  selectedItem?: string | null;
  defaultValue?: string;
  onSelect: (item: string) => void;
}
const SelectTitle = ({
  label,
  isOptionShow,
  disabled,
  defaultValue = "---",
  selectedItem,
}: {
  label?: string;
  isOptionShow: boolean;
  disabled?: boolean;
  defaultValue?: string;
  selectedItem?: string | null;
}) => {
  return (
    <div
      className={clsx(
        "min-w-[120px] p-2 flex justify-between items-center relative bg-white border border-gray-300 rounded-md",
        disabled && "!bg-gray-300 text-gray-400 cursor-not-allowed"
      )}
    >
      {label && (
        <div
          className={clsx(
            "absolute left-2 top-0  px-1 -translate-y-1/2  text-xs text-gray-600",
            styles.selectTitle
          )}
          style={
            {
              "--bg-color": disabled ? "transparent" : "#fff",
            } as CSSProperties
          }
        >
          {label}
        </div>
      )}
      <p>{selectedItem || defaultValue}</p>
      {isOptionShow ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </div>
  );
};

const Select = ({
  className,
  label,
  items,
  disabled,
  onSelect,
  defaultValue,
  selectedItem,
}: SelectProps) => {
  const [isOptionShow, setIsOptionShow] = useState(false);

  return (
    <PopOver
      className={className}
      disabled={disabled}
      parent={
        <SelectTitle
          label={label}
          disabled={disabled}
          isOptionShow={isOptionShow}
          defaultValue={defaultValue}
          selectedItem={selectedItem}
        />
      }
      isPopOverShow={isOptionShow}
      handlePopOverVisibility={(show) => setIsOptionShow(show)}
    >
      <div className="w-full flex flex-col gap-y-0.5">
        {(defaultValue ? items : ["---", ...items]).map((item) => (
          <div
            key={item}
            className={clsx(
              "min-w-max p-2 font-normal rounded-md hover:bg-gray-200 flex justify-between items-center cursor-pointer",
              selectedItem === item &&
                "bg-blue-100 text-blue-600 hover:!bg-blue-100"
            )}
            onClick={() => {
              onSelect(item === "---" ? "" : item);
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
