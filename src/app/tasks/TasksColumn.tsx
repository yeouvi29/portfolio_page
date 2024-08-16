"use client";

import { useRef, DragEvent, useState, Fragment, useEffect } from "react";
import clsx from "clsx";

import { DragEnterItem, DragStartItem, TaskItem, TaskItems } from "@/types";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

const TasksColumn = ({
  title,
  tasks,
  columnId,
  columnOrder,
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
  columnOrder: number;
  tasks: TaskItem[];
  dragItem: DragStartItem | null;
  dragEnterItem: DragEnterItem | null;
  onDragStart: (item: any) => void;
  onDrop: (shouldAddBefore: boolean) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDragLeave: () => void;
  onUpdateTask: (tasks: TaskItems) => void;
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const isReEnter = useRef(false);
  const [isCursorOnLeft, setIsCursorOnLeft] = useState<null | boolean>(null);
  const [isLeave, setIsLeave] = useState(false);

  const handleDragStart = (event: DragEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    const rect = (divRef.current as HTMLDivElement).getBoundingClientRect();
    const x2 = rect.left;
    const y2 = rect.top;
    const xPosition = x - x2;
    const yPosition = y - y2;
    const divEl = divRef.current as HTMLDivElement;

    event.dataTransfer.setDragImage(divEl, xPosition, yPosition);
    event.dataTransfer.effectAllowed = "move";
    onDragStart({ columnId, height: rect.height });
  };

  const handleDragLeave = () => {
    setIsLeave(true);
  };
  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    // If the dragged item is a task item, call the onDrop with the bottom position
    if (dragItem?.item) {
      onDrop(false);
    } else {
      // If the dragged item is a list item, call the onDrop with the left position
      onDrop(!!isCursorOnLeft);
      setIsCursorOnLeft(null);
      isReEnter.current = false;
    }
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    if (!dragItem) {
      return;
    }
    setIsLeave(false);
    if (dragItem.item) {
      onDragEnter({
        columnId,
        index: tasks.length ? tasks.length - 1 : 0,
        position: "bottom",
      });
    } else {
      const listEl = liRef.current as HTMLLIElement;
      const clientX = event.clientX;
      const left = listEl.getBoundingClientRect().left;
      const right = listEl.getBoundingClientRect().right;
      const isCurrentCursorOnLeft = clientX < left + (right - left) / 2;
      onDragEnter({
        columnId,
        position: isCurrentCursorOnLeft ? "left" : "right",
      });
      setIsCursorOnLeft(isCurrentCursorOnLeft);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    if (dragItem?.item) {
      return;
    }
    const listEl = liRef.current as HTMLLIElement;
    const clientX = event.clientX;
    const left = listEl.getBoundingClientRect().left;
    const right = listEl.getBoundingClientRect().right;
    const isCurrentCursorOnLeft = clientX < left + (right - left) / 2;
    if (isCurrentCursorOnLeft === isCursorOnLeft) {
      return;
    }
    setIsCursorOnLeft(isCurrentCursorOnLeft);
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

  const handleDragEnd = (e: DragEvent) => {
    isReEnter.current = false;
    if (dragItem) {
      e.stopPropagation();
      onDragLeave();
    }
  };

  useEffect(() => {
    if (dragEnterItem && dragEnterItem.columnId === columnId) {
      if (dragEnterItem.position === "right") {
        setIsCursorOnLeft(false);
      } else if (dragEnterItem.position === "left") {
        setIsCursorOnLeft(true);
      }
    }
  }, [dragEnterItem]);

  useEffect(() => {
    if (
      !dragItem ||
      dragItem.columnId !== columnId ||
      dragItem.item ||
      !dragEnterItem ||
      !isLeave
    ) {
      return;
    }

    isReEnter.current = true;
  }, [dragItem, dragEnterItem, isLeave]);

  const opacity =
    !dragItem ||
    (dragItem && dragItem.columnId !== columnId) ||
    (dragItem && dragItem.item)
      ? 1
      : !dragEnterItem ||
        (dragEnterItem &&
          dragEnterItem.columnId === columnId &&
          dragItem.columnId === columnId &&
          isReEnter.current === false)
      ? 0.3
      : 0;

  const isListDraggedOver =
    dragItem &&
    dragItem.item === undefined &&
    dragEnterItem &&
    dragEnterItem.columnId === columnId &&
    opacity === 1;

  const isItemDraggedOver =
    dragItem &&
    dragEnterItem &&
    dragEnterItem.columnId === columnId &&
    dragItem.item;

  return (
    <Fragment>
      {isListDraggedOver && isCursorOnLeft === true && (
        <div
          className={clsx("min-h-[calc(100vh-180px)] px-2")}
          data-draggedover={true}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <div
            className="min-w-[272px] bg-black/20 rounded-lg pointer-events-none"
            style={{
              height: dragItem?.height ? dragItem.height : 40,
            }}
          ></div>
        </div>
      )}
      <li
        ref={liRef}
        className={clsx("min-h-[calc(100vh-180px)] px-2")}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        data-testid={title}
        style={{
          opacity,
          display: opacity === 0 ? "none" : "block",
        }}
      >
        <div
          ref={divRef}
          className={clsx(
            "py-2 flex flex-col h-fit border-solid border-2 rounded-lg bg-gray-200",
            isItemDraggedOver ? "border-blue-600" : "border-gray-200"
          )}
          onDragOver={handleDragOver}
        >
          <div>
            <TaskTitle
              key={columnOrder}
              title={title}
              dragItem={dragItem}
              columnId={columnId}
              isCursorOnLeft={!!isCursorOnLeft}
              tasksLength={tasks.length}
              onDragStart={handleDragStart}
              onDragEnter={onDragEnter}
              onDrop={handleDrop}
              onTitleUpdate={handleTitleUpdate}
            />
          </div>
          <ol
            className="list-none flex flex-col px-2"
            onDragEnter={(e) => {
              e.stopPropagation();
            }}
          >
            {dragItem &&
              dragEnterItem &&
              dragEnterItem.columnId === columnId &&
              !tasks.length && (
                <div
                  className="w-[252px] bg-gray-300 rounded-lg mb-2"
                  style={{ height: dragItem.height ?? 40 }}
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
                isCursorOnLeft={!!isCursorOnLeft}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onUpdateTask={handleUpdateTask}
              />
            ))}
          </ol>
          <AddTask
            isListDragged={!dragItem?.item}
            isCursorOnLeft={!!isCursorOnLeft}
            columnId={columnId}
            tasksLength={tasks.length}
          />
        </div>
      </li>
      {isListDraggedOver && isCursorOnLeft === false && (
        <div
          className={clsx("min-h-[calc(100vh-180px)] px-2")}
          data-draggedover={true}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <div
            className="min-w-[272px] bg-black/20 rounded-lg pointer-events-none"
            style={{
              height: dragItem?.height ? dragItem?.height : 40,
            }}
          ></div>
        </div>
      )}
    </Fragment>
  );
};

export default TasksColumn;
