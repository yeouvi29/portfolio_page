"use client";
import { ReactNode, useState } from "react";
import PopOver from "../../common/PopOver/PopOver";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
interface SortPopOverProps {
  title: string;
  parent: ReactNode;
  onClickSort: (title: string, sortType: "asc" | "dsc") => void;
}
const SortPopOver = ({ title, parent, onClickSort }: SortPopOverProps) => {
  const [isPopOverShow, setIsPopOverShow] = useState(false);
  const handleClick = (sortType: "asc" | "dsc") => {
    onClickSort(title, sortType);
  };
  return (
    <PopOver
      parent={parent}
      isPopOverShow={isPopOverShow}
      handlePopOverVisibility={(show) => setIsPopOverShow(show)}
    >
      <div className="w-full flex flex-col">
        <p className="font-semibold">Sort</p>
        <div
          className="min-w-max p-2 font-normal rounded-md hover:bg-gray-200 flex justify-between items-center gap-2"
          onClick={() => {
            handleClick("asc");
            setIsPopOverShow(false);
          }}
        >
          Ascending
          <span>
            <IoIosArrowRoundUp />
          </span>
        </div>
        <div
          className="min-w-max p-2 font-normal rounded-md hover:bg-gray-200 flex justify-between items-center gap-2"
          onClick={() => {
            handleClick("dsc");
            setIsPopOverShow(false);
          }}
        >
          Descending
          <span>
            <IoIosArrowRoundDown />
          </span>
        </div>
      </div>
    </PopOver>
  );
};
export default SortPopOver;
