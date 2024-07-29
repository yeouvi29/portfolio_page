"use client";

import { useState } from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import TasksColumn from "./TasksColumn";

const BoardSection = () => {
  const [taskItems, setTaskItems] = useState([
    {
      title: "To do",
      id: uuidv4(),
      items: [
        {
          id: uuidv4(),
          text: "aasdfoiejw.afjd.lfa as.dlifjdsfldsjfldsfj dss ",
        },
        { id: uuidv4(), text: "b" },
        { id: uuidv4(), text: "c" },
      ],
    },
    {
      title: "In Progress",
      id: uuidv4(),
      items: [
        { id: uuidv4(), text: "aa" },
        { id: uuidv4(), text: "bb" },
        { id: uuidv4(), text: "cc" },
      ],
    },
    {
      title: "Done",
      id: uuidv4(),
      items: [
        { id: uuidv4(), text: "aaa" },
        { id: uuidv4(), text: "bbb" },
      ],
    },
  ]);
  const [dragItem, setDragItem] = useState<any>(null);

  const handleDrop = (dropItemColumnId: string, dropItemIndex: number) => {
    const dragColumnIndex = taskItems.findIndex(
      (column) => column.id === dragItem.columnId
    );
    const dropColumnIndex = taskItems.findIndex(
      (column) => column.id === dropItemColumnId
    );
    const newTaskItems = [...taskItems];
    const dragItemIndex = newTaskItems[dragColumnIndex].items.findIndex(
      (item) => item.id === dragItem.item.task.id
    );

    const isTheSameItem =
      dragItemIndex === dropItemIndex && dragColumnIndex === dropColumnIndex;

    if (isTheSameItem) {
      setDragItem(null);
      return;
    }

    newTaskItems[dropColumnIndex].items.splice(
      dropItemIndex,
      0,
      dragItem.item.task
    );
    if (dropItemColumnId === dragItem.columnId) {
      if (dragItemIndex < dropItemIndex) {
        newTaskItems[dragColumnIndex].items.splice(dragItemIndex, 1);
      } else {
        newTaskItems[dragColumnIndex].items.splice(dragItemIndex + 1, 1);
      }
    } else {
      newTaskItems[dragColumnIndex].items = newTaskItems[
        dragColumnIndex
      ].items.filter((item) => item.id !== dragItem.item.task.id);
    }

    setTaskItems(newTaskItems);
    setDragItem(null);
  };

  return (
    <ol className={clsx("flex mt-4 gap-3 list-none")}>
      {taskItems.map((item) => (
        <TasksColumn
          key={item.id}
          columnId={item.id}
          title={item.title}
          tasks={item.items}
          dragItem={dragItem}
          onDrop={handleDrop}
          onDragStart={setDragItem}
        />
      ))}
    </ol>
  );
};
export default BoardSection;
