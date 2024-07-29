"use client";

import { useState, DragEvent, useRef } from "react";

const TaskTitle = ({
  title,
  dragItem,
  columnId,
  onDrop,
}: {
  title: string;
  dragItem: any;
  columnId: string;
  onDrop: (columnId: string, index: number) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();

    setIsDraggedOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    const listEl = divRef.current as HTMLDivElement;
    const pointer = event.clientY;
    const top = listEl.getBoundingClientRect().top;

    if (pointer - top < 8 && pointer - top >= 0) {
      return;
    }
    setIsDraggedOver(false);
  };
  const handleDrop = () => {
    onDrop(columnId, 0);
  };
  return (
    <div
      ref={divRef}
      className="w-[272px] p-2 pointer-events-auto"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{title}</p>
      {isDraggedOver && (
        <div
          className="w-full h-10 bg-gray-300 rounded-lg mb-2"
          style={{ height: dragItem?.height ?? 40 }}
          data-draggedover={true}
        ></div>
      )}
    </div>
  );
};
export default TaskTitle;
