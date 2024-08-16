"use client";

import { Fragment, useEffect, useState } from "react";

import Select from "@/components/common/Select/Select";
import { TaskItems } from "@/types";

interface ListMoveOptionsProps {
  columnId: string;
  taskItems: TaskItems[];
  onClose: () => void;
  updateTaskItems: (items: TaskItems[]) => void;
}

const ListMoveOptions = ({
  columnId,
  taskItems,
  onClose,
  updateTaskItems,
}: ListMoveOptionsProps) => {
  const [selectedListIndex, setSelectedListIndex] = useState<number>(
    taskItems.findIndex((item) => item.id === columnId)
  );

  const handleMoveList = () => {
    const listIndex = taskItems.findIndex((item) => item.id === columnId);
    if (selectedListIndex === listIndex) {
      return;
    }

    const newItems = taskItems.reduce((acc, list, i) => {
      if (list.id === columnId) {
        return acc;
      } else if (i === selectedListIndex) {
        acc.push(listIndex > selectedListIndex ? taskItems[listIndex] : list);
        acc.push(listIndex > selectedListIndex ? list : taskItems[listIndex]);
        return acc;
      }
      acc.push(list);
      return acc;
    }, [] as TaskItems[]);

    updateTaskItems(newItems);
    onClose();
  };

  return (
    <Fragment>
      <Select
        label="List"
        defaultValue={(selectedListIndex + 1).toString()}
        optionClassName="w-full"
        items={new Array(taskItems.length)
          .fill("")
          .map((_, i) => (i + 1).toString())}
        onSelect={(value, i) => {
          setSelectedListIndex(i);
        }}
      />
      <button
        className="min-w-max ml-auto bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-700"
        onClick={handleMoveList}
      >
        Move
      </button>
    </Fragment>
  );
};
export default ListMoveOptions;
