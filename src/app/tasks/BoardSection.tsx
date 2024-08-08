"use client";

import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

import { useDropTask } from "@/hooks/useDropTask";
import { useTaskItems } from "@/store";
import { TaskItems } from "@/types";

import TasksColumn from "./TasksColumn";
import NewList from "./NewList";

const BoardSection = () => {
  const [
    taskItems,
    dragItem,
    dragEnterItem,
    setDragItem,
    setDragEnterItem,
    setTaskItems,
    resetDrag,
  ] = useTaskItems(
    ({ items, drag, setDragStart, setDragEnter, setTaskItems, resetDrag }) => [
      items,
      drag.start,
      drag.enter,
      setDragStart,
      setDragEnter,
      setTaskItems,
      resetDrag,
    ]
  );

  const { handleDrop } = useDropTask();
  const addNewList = (title: string) => {
    setTaskItems([...taskItems, { title, id: uuidv4(), items: [] }]);
  };
  const updateTaskItems = (newTaskItem: TaskItems) => {
    const updatedTaskItems = taskItems.map((taskItem) => {
      if (taskItem.id === newTaskItem.id) {
        return newTaskItem;
      }
      return taskItem;
    });
    setTaskItems(updatedTaskItems);
  };
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
          onDragLeave={resetDrag}
          onUpdateTask={updateTaskItems}
        />
      ))}
      <NewList addNewList={addNewList} />
    </ol>
  );
};

export default BoardSection;
