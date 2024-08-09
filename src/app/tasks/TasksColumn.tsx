"use client";

import { useRef, DragEvent } from "react";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

import { DragEnterItem, DragStartItem, TaskItem, TaskItems } from "@/types";

const TasksColumn = ({
  title,
  tasks,
  columnId,
  onDrop,
  dragItem,
  dragEnterItem,
  onDragStart,
  onDragEnter,
  onDragLeave,
  onUpdateTask,
}: {
  title: string;
  columnId: string;
  tasks: TaskItem[];
  dragItem: DragStartItem | null;
  dragEnterItem: DragEnterItem | null;
  onDragStart: (item: any) => void;
  onDrop: (isCursorOnTop: boolean) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDragLeave: () => void;
  onUpdateTask: (tasks: TaskItems) => void;
}) => {
  const liRef = useRef<HTMLLIElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    onDrop(false);
  };

  const handleDragEnter = () => {
    onDragEnter({
      columnId,
      index: tasks.length ? tasks.length - 1 : 0,
      addToBottom: true,
    });
  };

  const handleTitleUpdate = (title: string, columnId: string) => {
    onUpdateTask({
      title,
      id: columnId,
      items: tasks,
    });
  };

  const handleUpdateTask = (updateTask: TaskItem) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updateTask.id ? updateTask : task
    );
    onUpdateTask({
      title,
      id: columnId,
      items: updatedTasks,
    });
  };

  const isDraggedOver =
    dragItem && dragEnterItem && dragEnterItem.columnId === columnId;

  return (
    <li
      ref={liRef}
      className={clsx("min-h-[calc(100vh-180px)] px-2")}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={handleDragEnter}
      data-testid={title}
    >
      <div
        className={clsx(
          "p-2 flex flex-col h-fit rounded-lg border-solid border-2  bg-gray-200",
          isDraggedOver ? "border-blue-600" : "border-gray-200"
        )}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <TaskTitle
          title={title}
          columnId={columnId}
          tasksLength={tasks.length}
          onDragEnter={onDragEnter}
          onTitleUpdate={handleTitleUpdate}
        />
        <ol
          className="list-none flex flex-col"
          onDragEnter={(e) => {
            e.stopPropagation();
          }}
        >
          {dragItem &&
            dragEnterItem &&
            dragEnterItem.columnId === columnId &&
            !tasks.length && (
              <div
                className="w-[272px] bg-gray-300 rounded-lg mb-2 pointer-events-none"
                style={{ height: dragItem.item.height ?? 40 }}
                data-draggedover={true}
              ></div>
            )}
          {tasks.map((task: any, i: number) => (
            <TaskCard
              dragItem={dragItem}
              dragEnterItem={dragEnterItem}
              columnId={columnId}
              key={task.id + i}
              index={i}
              task={task}
              title={title}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onUpdateTask={handleUpdateTask}
            />
          ))}
        </ol>
        <AddTask columnId={columnId} tasksLength={tasks.length} />
      </div>
    </li>
  );
};

export default TasksColumn;
