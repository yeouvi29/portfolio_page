"use client";

import { DragEvent } from "react";

import { useIsCursorOnTop } from "@/store";
import { DragEnterItem } from "@/types";

const TaskTitle = ({
  title,
  columnId,
  onDragEnter,
  tasksLength,
}: {
  title: string;
  columnId: string;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  tasksLength: number;
}) => {
  const [setIsCursorOnTop] = useIsCursorOnTop(({ setIsCursorOnTop }) => [
    setIsCursorOnTop,
  ]);

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    setIsCursorOnTop(false);
    onDragEnter({
      columnId,
      index: tasksLength ? tasksLength - 1 : 0,
    });
  };

  return (
    <div className="w-[272px] p-2">
      <p onDragOver={(e) => e.preventDefault()} onDragEnter={handleDragEnter}>
        {title}
      </p>
    </div>
  );
};
export default TaskTitle;
