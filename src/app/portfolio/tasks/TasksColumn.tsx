"use client";

import { useRef, useState, DragEvent } from "react";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

import styles from "./styles.module.css";
import { set } from "date-fns";

const TasksColumn = ({
  title,
  tasks,
  onDrop,
  dragItem,
  onDragStart,
}: {
  title: string;
  tasks: any;
  dragItem: any;
  onDrop: (key: any, item: any) => void;
  onDragStart: (item: any) => void;
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();

    setIsDraggedOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    setIsDraggedOver(false);
  };

  const handleDrop = () => {
    setIsDraggedOver(false);
  };

  return (
    <li
      ref={liRef}
      className={clsx(
        "flex flex-col h-fit rounded-lg border-solid border-2 border-gray-200 bg-gray-200",
        styles.tasksColumn,
        isDraggedOver && "border-red-600"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <TaskTitle title={title} dragItem={dragItem} />
      <ol className="list-none flex flex-col gap-2 pointer-events-none">
        {tasks.map((task: any, i: number) => (
          <TaskCard
            dragItem={dragItem}
            key={i}
            task={task}
            title={title}
            onDragStart={onDragStart}
          />
        ))}
      </ol>
      <AddTask dragItem={dragItem} />
    </li>
  );
};

export default TasksColumn;
