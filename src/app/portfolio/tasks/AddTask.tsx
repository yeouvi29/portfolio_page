"use client";

import { set } from "date-fns";
import { useState, DragEvent, useRef } from "react";

const AddTask = ({ dragItem }: { dragItem: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();

    setIsDraggedOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    const divEl = divRef.current as HTMLDivElement;
    const pointer = event.clientY;
    const top = divEl.getBoundingClientRect().top;

    if (pointer - top < 8 && pointer - top >= 0) {
      return;
    }
    setIsDraggedOver(false);
  };
  const handleDrop = () => {
    setIsDraggedOver(false);
  };

  return (
    <div
      ref={divRef}
      className="w-full p-2 pointer-events-auto"
      onDrop={handleDrop}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDraggedOver && (
        <div
          className="w-full h-10 bg-gray-300 rounded-lg mb-2 pointer-events-none"
          style={{ height: dragItem?.height ?? 40 }}
          data-draggedover={true}
        ></div>
      )}
      <p className="pointer-events-none">+ Add a card</p>
    </div>
  );
};

export default AddTask;
