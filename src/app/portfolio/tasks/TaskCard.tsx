"use client";

import clsx from "clsx";
import { DragEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TaskCard = ({
  task,
  title,
  dragItem,
  onDragStart,
  isFirst,
}: {
  isFirst?: boolean;
  task: any;
  title: string;
  dragItem: any;
  onDragStart: (item: any) => void;
}) => {
  const listRef = useRef<HTMLLIElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const handleDragStart = (event: any) => {
    const height = event.target.clientHeight;
    onDragStart({ title, item: task, height });
    const dragImage = document.createElement("div");
    dragImage.classList.add(
      "absolute",
      "w-[272px]",
      "top-[-9999px]",
      "left-[-9999px]",
      "rounded-lg",
      "bg-white",
      "p-2",
      "border-sky-500",
      "border-2",
      "border-solid"
    );

    dragImage.textContent = task;
    document.body.appendChild(dragImage);

    event.dataTransfer.setDragImage(dragImage, 0, 0);

    setTimeout(() => {
      (listRef?.current as HTMLLIElement).style.display = "none";
    }, 0);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();

    setIsDraggedOver(true);
  };

  const handleDragEnd = (event: any) => {
    onDragStart(null);
    (listRef?.current as HTMLLIElement).style.display = "block";
  };

  return (
    <li
      ref={listRef}
      className={clsx(
        "relative w-[272px] bg-white transition-all duration-300 ease-in-out"
      )}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={() => {
          setIsDraggedOver(false);
        }}
        onDragLeave={() => setIsDraggedOver(false)}
        className={clsx(
          "w-full rounded-lg p-2 border-sky-500 border-2 border-solid"
        )}
      >
        {task}
      </div>

      <AnimatePresence>
        {isDraggedOver && (
          <motion.div
            className="w-full h-10 bg-gray-200 rounded-lg mt-2"
            initial={{ height: 0 }}
            animate={{ height: dragItem?.height ?? 40 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>
    </li>
  );
};

export default TaskCard;
