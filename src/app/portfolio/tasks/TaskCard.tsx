"use client";

import clsx from "clsx";
import { DragEvent, use, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TaskCard = ({
  task,
  index,
  columnId,
  dragItem,
  onDragStart,
  onDrop,
}: {
  task: any;
  title: string;
  index: number;
  columnId: string;
  dragItem: any;
  onDragStart: (item: any) => void;
  onDrop: (columnId: string, index: number) => void;
}) => {
  const listRef = useRef<HTMLLIElement>(null);
  const [isDragStart, setIsDragStart] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragStart = (event: any) => {
    const height = event.target.clientHeight;
    const x = event.clientX;
    const y = event.clientY;
    const x2 = event.target.getBoundingClientRect().x;
    const y2 = event.target.getBoundingClientRect().top;
    const xPosition = x - x2;
    const yPosition = y - y2;
    onDragStart({ columnId, item: { task, height } });

    const dragImage = document.createElement("div");
    dragImage.setAttribute("id", "drag-image");
    dragImage.classList.add(
      "absolute",
      "w-[256px]",
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

    setIsDragStart(true);
    event.dataTransfer.setDragImage(dragImage, xPosition, yPosition);
    setTimeout(() => {
      (listRef?.current as HTMLLIElement).style.opacity = "0.3";
    }, 0);
  };

  const handleDragOver = () => {
    setIsDraggedOver(true);
  };

  const handleDragEnd = () => {
    // onDragStart(null);
    const listEl = listRef.current as HTMLLIElement;
    listEl.style.opacity = "1";
    listEl.style.display = "block";
  };

  const handleDragLeave = (event: DragEvent) => {
    const listEl = listRef.current as HTMLLIElement;
    const pointer = event.clientY;
    const top = listEl.getBoundingClientRect().top;

    if (pointer - top < 8 && pointer - top >= 0) {
      return;
    }

    if (isDragStart) {
      listEl.style.display = "none";
    } else {
      listEl.style.opacity = "1";
      listEl.style.display = "block";
    }

    setIsDraggedOver(false);
  };

  const handleDrop = () => {
    setIsDragStart(false);
    const imageEl = document.getElementById("drag-image");
    document.body.removeChild(imageEl!);
    onDrop(columnId, index);
  };

  useEffect(() => {
    if (!dragItem) {
      setIsDraggedOver(false);
      const listEl = listRef.current as HTMLLIElement;
      listEl.style.opacity = "1";
      listEl.style.display = "block";
    } else if (dragItem && dragItem.item.task.id === task.id) {
      setIsDraggedOver(true);
    }
  }, [dragItem]);

  return (
    <li
      ref={listRef}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      className={clsx("relative px-2 w-[272px] pointer-events-auto")}
    >
      {dragItem && isDraggedOver && !isDragStart && (
        <div
          className="w-full h-10 bg-gray-300 rounded-lg mb-2 pointer-events-none"
          style={{ height: dragItem?.height ?? 40 }}
          data-draggedover={true}
        ></div>
      )}
      <div
        className={clsx(
          "w-full rounded-lg p-2 bg-white border-sky-500 border-2 border-solid pointer-events-none"
        )}
      >
        {task.text}
      </div>
    </li>
  );
};

export default TaskCard;
