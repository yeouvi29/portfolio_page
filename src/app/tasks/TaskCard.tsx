"use client";

import {
  DragEvent,
  TouchEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
  use,
} from "react";
import clsx from "clsx";
import { TbPencil } from "react-icons/tb";

import { DragEnterItem, DragStartItem, TaskItem } from "@/types";

import { removeElements } from "../../../utils";
import CardOptionsMiniMenu from "@/components/ui/CardOptionsMiniMenu/CardOptionsMiniMenu";
import styles from "./styles.module.css";
import { useBreakpoint } from "@/hooks/useBreakpoint";
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
  onUpdateTask,
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
  onUpdateTask: (tasks: TaskItem) => void;
}) => {
  const listRef = useRef<HTMLLIElement>(null);
  const isReEnter = useRef(false);
  const [isCursorOnTop, setIsCursorOnTop] = useState<null | boolean>(null);
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const { isUpOrEqual } = useBreakpoint();
  const isWebView = isUpOrEqual("md");
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
      "pr-8",
      "border-gray-400/40",
      "border-[1px]",
      "shadow-sm",
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

  const handleTouchEnd = (e: TouchEvent) => {
    console.log("end", e.target);
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    // dragImage.style.left = `${touch.pageX - 25}px`;
    // dragImage.style.top = `${touch.pageY - 25}px`;

    const elementBelow = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    console.log("Element below touch point:", elementBelow);
  };
  const handleTouchStart = (e: TouchEvent) => {
    console.log("start", e.target);
  };
  const handleUpdateTask = (newValue: string) => {
    onUpdateTask({ ...task, text: newValue });
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
        className={clsx(
          "relative w-[272px] pointer-events-auto cursor-auto group",
          "py-1",
          !dragItem &&
            "after:hidden after:absolute after:w-full after:h-[calc(100%-8px)] after:left-0 after:top-1 after:border-2  after:border-solid after:border-blue-600 after:rounded-lg after:pointer-events-none",
          styles.taskCard
        )}
        style={{
          opacity,
          display: opacity === 0 ? "none" : "block",
        }}
        onClick={() => {
          if (isWebView) {
            return;
          }
          // setShowMiniMenu(true);
        }}
        draggable
        onDragEnter={handleDragEnter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isDraggedOver && isCursorOnTop === true && (
          <div
            className="w-full h-10 bg-gray-300 rounded-lg mb-2 pointer-events-none"
            style={{
              height: dragItem?.item.height
                ? `calc(${dragItem?.item.height}px - 2px)`
                : 40,
            }}
            data-draggedover={true}
          ></div>
        )}

        <div
          className={clsx(
            "taskCard relative w-full rounded-lg p-2 bg-white border-gray-400/40 border-[1px] shadow-sm order-solid pr-8 cursor-pointer"
          )}
        >
          {task.text}
        </div>
        {isDraggedOver && !isCursorOnTop && (
          <div
            className="w-full h-10 bg-gray-300 rounded-lg mt-2 pointer-events-none"
            style={{
              height: dragItem?.item.height
                ? `calc(${dragItem?.item.height}px - 2px)`
                : 40,
            }}
            data-draggedover={true}
          ></div>
        )}
        <button
          className={clsx(
            "hidden absolute w-8 h-8 mt-0.5 top-2 right-1 py-1.5 px-2 text-s rounded-full md:mt-0",
            !dragItem && "group-hover:block hover:bg-gray-300"
          )}
          onClick={() => setShowMiniMenu(true)}
        >
          <TbPencil />
        </button>
        {showMiniMenu && (
          <CardOptionsMiniMenu
            task={task.text}
            onClose={() => setShowMiniMenu(false)}
            updateTask={handleUpdateTask}
          />
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
            style={{
              height: dragItem?.item.height
                ? `calc(${dragItem?.item.height}px - 2px)`
                : 40,
            }}
            data-draggedover={true}
          ></div>
        )}
    </Fragment>
  );
};

export default TaskCard;
