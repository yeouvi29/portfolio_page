"use client";

import { useRef, useState, DragEvent } from "react";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

import styles from "./styles.module.css";
import { DragEnterItem } from "@/store";

const TasksColumn = ({
  title,
  tasks,
  columnId,
  onDrop,
  dragItem,
  dragEnterItem,
  onDragStart,
  onDragEnter,
}: {
  title: string;
  tasks: any;
  columnId: string;
  dragItem: any;
  dragEnterItem: any;
  onDragStart: (item: any) => void;
  onDrop: (columnId: string, index: number) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
}) => {
  const liRef = useRef<HTMLLIElement>(null);

  const handleDrop = () => {
    const imageEl = document.getElementById("drag-image");
    document.body.removeChild(imageEl!);
    onDrop(columnId, tasks.length);
  };

  const handleDragEnter = () => {
    onDragEnter({ columnId, index: tasks.length - 1 });
  };

  const isDraggedOver =
    dragItem &&
    dragItem.columnId === columnId &&
    (!dragEnterItem || (dragEnterItem && dragEnterItem.columnId === columnId));

  return (
    <li
      ref={liRef}
      className={clsx("min-h-screen px-2")}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={handleDragEnter}
    >
      <div
        className={clsx(
          "p-2 flex flex-col h-fit rounded-lg border-solid border-2 border-gray-200 bg-gray-200",
          styles.tasksColumn,
          isDraggedOver && "border-red-600"
        )}
        onDragEnter={(e) => {
          e.stopPropagation();
        }}
        onDrop={() => {
          console.log("drop, here");
        }}
      >
        <TaskTitle title={title} />
        <ol
          className="list-none flex flex-col gap-2 pointer-events-none"
          onDrop={() => {
            console.log("drop, here2");
          }}
        >
          {tasks.map((task: any, i: number) => (
            <TaskCard
              dragItem={dragItem}
              dragEnterItem={dragEnterItem}
              columnId={columnId}
              key={task.id}
              index={i}
              task={task}
              title={title}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragEnter={onDragEnter}
            />
          ))}
        </ol>
        <AddTask />
      </div>
    </li>
  );
};

export default TasksColumn;
