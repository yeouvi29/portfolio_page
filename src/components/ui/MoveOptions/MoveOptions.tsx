"use client";

import { Fragment, useEffect, useState } from "react";

import Select from "@/components/common/Select/Select";
import { useTaskItems } from "@/store";
import { TaskItem, TaskItems } from "@/types";

interface MoveOptionsProps {
  columnId: string;
  taskIndex: number;
}

const MoveOptions = ({ columnId, taskIndex }: MoveOptionsProps) => {
  const [taskItems, setTaskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);
  const [selectedListIndex, setSelectedListIndex] = useState<number>(
    taskItems.findIndex((item) => item.id === columnId)
  );
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(taskIndex);

  const handleMoveTask = () => {
    const newItems: TaskItems[] = [...taskItems];
    const isOnSameList = taskItems[selectedListIndex].id === columnId;
    if (isOnSameList) {
      if (selectedTaskIndex === taskIndex) {
        return newItems;
      } else if (
        selectedTaskIndex === newItems[selectedListIndex].items.length
      ) {
        const task = newItems[selectedListIndex].items.splice(taskIndex, 1);
        newItems[selectedListIndex].items.push(task[0]);
      } else {
        const toMoveTask = newItems[selectedListIndex].items[taskIndex];
        const newList = newItems[selectedListIndex].items.reduce(
          (acc, item, i) => {
            console.log(item.id, toMoveTask.id, i, selectedTaskIndex);
            if (item.id === toMoveTask.id) {
              return acc;
            } else if (i === selectedTaskIndex) {
              console.log("same");
              acc.push(toMoveTask);
              acc.push(item);
              console.log(acc);
              return acc;
            } else {
              acc.push(item);
              return acc;
            }
          },
          [] as TaskItem[]
        );
        newItems[selectedListIndex].items = newList;
      }
    } else {
      const columnIndex = newItems.findIndex((item) => item.id === columnId);
      const task = newItems[columnIndex].items.splice(taskIndex, 1);
      newItems[selectedListIndex].items.splice(selectedTaskIndex, 0, task[0]);
    }
    setTaskItems(newItems);
  };

  useEffect(() => {
    const lastIndex = taskItems[selectedListIndex].items.length;
    setSelectedTaskIndex(lastIndex);
  }, [selectedListIndex]);

  return (
    <Fragment>
      <Select
        label="List"
        items={taskItems.map((item) => item.title)}
        defaultValue={taskItems[selectedListIndex].title}
        optionClassName="w-full"
        onSelect={(value, i) => {
          setSelectedListIndex(i);
        }}
      />
      <Select
        label="Position"
        defaultValue={(selectedTaskIndex + 1).toString()}
        optionClassName="w-full"
        items={new Array(taskItems[selectedListIndex].items.length + 1)
          .fill("")
          .map((_, i) => (i + 1).toString())}
        onSelect={(value, i) => {
          setSelectedTaskIndex(i);
        }}
      />
      <button
        className="min-w-max ml-auto bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-700"
        onClick={handleMoveTask}
      >
        Move
      </button>
    </Fragment>
  );
};
export default MoveOptions;
