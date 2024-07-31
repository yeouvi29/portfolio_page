"use client";
import { DragEvent } from "react";

import { useIsCursorOnTop, useTaskItems } from "@/store";

const AddTask = ({
  columnId,
  tasksLength,
}: {
  columnId: string;
  tasksLength: number;
}) => {
  const [isCursorOnTop, setIsCursorOnTop] = useIsCursorOnTop(
    ({ isCursorOnTop, setIsCursorOnTop }) => [isCursorOnTop, setIsCursorOnTop]
  );
  const [setDragEnterItem] = useTaskItems(({ setDragEnter }) => [setDragEnter]);

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    if (isCursorOnTop) {
      setIsCursorOnTop(false);
    }
    setDragEnterItem({
      columnId,
      index: tasksLength ? tasksLength - 1 : 0,
    });
  };

  return (
    <div
      className="w-full mt-2 p-2 group relative cursor-pointer rounded-lg hover:bg-gray-400/30 pointer-events-none"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
    >
      + Add a card
    </div>
  );
};

export default AddTask;
