"use client";

import clsx from "clsx";
import TasksColumn from "./TasksColumn";
import { useDragEnterItem, useDragItem, useTaskItems } from "@/store";
import { useDropTask } from "@/hooks/useDropTask";
import { set } from "date-fns";

const BoardSection = () => {
  const [taskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);

  const [dragItem, setDragItem] = useDragItem(({ item, setDragItem }) => [
    item,
    setDragItem,
  ]);

  const [dragEnterItem, setDragEnterItem] = useDragEnterItem(
    ({ item, setDragEnterItem }) => [item, setDragEnterItem]
  );

  const { handleDrop } = useDropTask();

  console.log("dragEnter", dragEnterItem, "dragstart", dragItem);

  return (
    <ol
      className={clsx("flex mt-4 list-none")}
      onDragOver={(e) => e.preventDefault()}
    >
      {taskItems.map((item) => (
        <TasksColumn
          key={item.id}
          columnId={item.id}
          title={item.title}
          tasks={item.items}
          dragItem={dragItem}
          dragEnterItem={dragEnterItem}
          onDrop={handleDrop}
          onDragStart={setDragItem}
          onDragEnter={setDragEnterItem}
        />
      ))}
    </ol>
  );
};

export default BoardSection;
