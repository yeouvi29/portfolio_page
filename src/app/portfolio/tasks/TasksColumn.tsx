"use client";

import { useRef, useState, DragEvent } from "react";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

import styles from "./styles.module.css";

const TasksColumn = ({
  title,
  tasks,
  columnId,
  onDrop,
  dragItem,
  onDragStart,
}: {
  title: string;
  tasks: any;
  columnId: string;
  dragItem: any;
  onDrop: (columnId: string, index: number) => void;
  onDragStart: (item: any) => void;
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();

    setIsDraggedOver(true);
  };

  const handleDragLeave = () => {
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
      <TaskTitle
        title={title}
        dragItem={dragItem}
        columnId={columnId}
        onDrop={onDrop}
      />
      <ol className="list-none flex flex-col gap-2 pointer-events-none">
        {tasks.map((task: any, i: number) => (
          <TaskCard
            dragItem={dragItem}
            columnId={columnId}
            key={task.id}
            index={i}
            task={task}
            title={title}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </ol>
      <AddTask
        dragItem={dragItem}
        columnId={columnId}
        onDrop={onDrop}
        index={tasks.length}
      />
    </li>
  );
};

export default TasksColumn;
