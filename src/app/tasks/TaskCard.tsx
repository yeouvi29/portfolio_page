"use client";

import { DragEvent, Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { DragEnterItem, DragStartItem, TaskItem } from "@/types";

import { removeElements } from "../../../utils";

const TaskCard = ({
  task,
  index,
  isLast,
  columnId,
  dragItem,
  dragEnterItem,
  onDragStart,
  onDragEnter,
  onDrop,
  onDragLeave,
}: {
  title: string;
  index: number;
  columnId: string;
  isLast?: boolean;
  task: TaskItem;
  dragItem: DragStartItem | null;
  dragEnterItem: DragEnterItem | null;
  onDragStart: (item: DragStartItem) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDrop: (isCursorOnTop: boolean) => void;
  onDragLeave: () => void;
}) => {
  const listRef = useRef<HTMLLIElement>(null);
  const isReEnter = useRef(false);
  const [isCursorOnTop, setIsCursorOnTop] = useState<null | boolean>(null);
  const handleDragStart = (event: any) => {
    const x = event.clientX;
    const y = event.clientY;
    const x2 = event.target.getBoundingClientRect().x;
    const y2 = event.target.getBoundingClientRect().top;
    const xPosition = x - x2;
    const yPosition = y - y2;

    const dragImage = document.createElement("div");
    dragImage.setAttribute("id", "drag-image");
    dragImage.classList.add(
      "absolute",
      "w-[272px]",
      "top-[-9999px]",
      "x-[-9999px]",
      "rounded-lg",
      "bg-white",
      "p-2",
      "border-sky-500",
      "border-2",
      "border-solid"
    );

    dragImage.textContent = task.text;
    document.body.appendChild(dragImage);

    onDragStart({
      columnId,
      item: { task, height: dragImage.clientHeight + 4 },
    });

    event.dataTransfer.setDragImage(dragImage, xPosition, yPosition);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const listEl = listRef.current as HTMLLIElement;
    const clientY = e.clientY;
    const top = listEl.getBoundingClientRect().top;
    const bottom = listEl.getBoundingClientRect().bottom;
    const isCurrentCursorOnTop = clientY < top + (bottom - top) / 2;
    if (isCurrentCursorOnTop === isCursorOnTop) {
      return;
    }
    setIsCursorOnTop(isCurrentCursorOnTop);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();

    onDragEnter({ columnId, index });
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    // console.log("drop, card", isCursorOnTop);
    onDrop(!!isCursorOnTop);
    isReEnter.current = false;
  };

  const handleDragEnd = (e: DragEvent) => {
    isReEnter.current = false;
    if (dragItem) {
      e.stopPropagation();
      onDragLeave();
      removeElements("#drag-image");
    }
  };

  const opacity =
    !dragItem || (dragItem && dragItem.item.task.id !== task.id)
      ? 1
      : !dragEnterItem ||
        (dragEnterItem &&
          dragEnterItem.columnId === columnId &&
          dragEnterItem.index === index &&
          !isReEnter.current)
      ? 0.3
      : 0;

  useEffect(() => {
    if (
      !dragItem ||
      dragItem.item.task.id !== task.id ||
      !dragEnterItem ||
      (dragEnterItem.columnId === columnId &&
        dragEnterItem.index === index &&
        !isReEnter.current)
    ) {
      return;
    }

    isReEnter.current = true;
  }, [dragItem, dragEnterItem]);

  useEffect(() => {
    if (
      dragEnterItem &&
      dragEnterItem.columnId === columnId &&
      dragEnterItem.index === index &&
      dragEnterItem.addToBottom === true
    ) {
      setIsCursorOnTop(false);
    }
  }, [dragEnterItem]);

  const isDraggedOver =
    dragItem &&
    dragEnterItem &&
    (dragEnterItem.columnId !== columnId ||
      dragItem.columnId !== columnId ||
      dragEnterItem.index !== index ||
      dragItem.item.task.id !== task.id) &&
    dragEnterItem?.columnId === columnId &&
    opacity === 1 &&
    dragEnterItem?.index === index;

  return (
    <Fragment>
      <li
        ref={listRef}
        className={clsx("relative w-[272px] pointer-events-auto", "py-1")}
        style={{
          opacity,
          display: opacity === 0 ? "none" : "block",
        }}
        draggable
        onDragEnter={handleDragEnter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
      >
        {isDraggedOver && isCursorOnTop === true && (
          <div
            className="w-full h-10 bg-gray-300 rounded-lg mb-2 pointer-events-none"
            style={{ height: dragItem?.item.height ?? 40 }}
            data-draggedover={true}
          ></div>
        )}

        <div
          className={clsx(
            "w-full rounded-lg p-2 bg-white border-sky-500 border-2 order-solid pointer-events-none"
          )}
        >
          {task.text}
        </div>
        {isDraggedOver && !isCursorOnTop && (
          <div
            className="w-full h-10 bg-gray-300 rounded-lg mt-2 pointer-events-none"
            style={{ height: dragItem?.item.height ?? 40 }}
            data-draggedover={true}
          ></div>
        )}
      </li>
      {isCursorOnTop == false &&
        dragEnterItem &&
        dragEnterItem.columnId === columnId &&
        dragEnterItem.index === index &&
        dragItem &&
        dragItem.item.task.id === task.id &&
        opacity === 0 && (
          <div
            className={clsx(
              "w-[272px] bg-gray-300 rounded-lg pointer-events-none my-1"
            )}
            style={{ height: dragItem.item.height ?? 40 }}
            data-draggedover={true}
          ></div>
        )}
    </Fragment>
  );
};

export default TaskCard;
