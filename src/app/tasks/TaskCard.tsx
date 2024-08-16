"use client";

import { DragEvent, Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TbPencil } from "react-icons/tb";

import { DragEnterItem, DragStartItem, TaskItem } from "@/types";
import CardOptionsMiniMenu from "@/components/ui/CardOptionsMiniMenu/CardOptionsMiniMenu";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import FixedPopOver from "@/components/common/FixedPopOver/FIxedPopUp";

import { removeElements } from "../../../utils";
import styles from "./styles.module.css";

const TaskCard = ({
  task,
  index,
  columnId,
  isCursorOnLeft,
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
  isCursorOnLeft: boolean;
  task: TaskItem;
  dragItem: DragStartItem | null;
  dragEnterItem: DragEnterItem | null;
  onDragStart: (item: DragStartItem) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDrop: (shouldAddBefore: boolean) => void;
  onDragLeave: () => void;
  onUpdateTask: (tasks: TaskItem) => void;
}) => {
  const listRef = useRef<HTMLLIElement>(null);
  const isReEnter = useRef(false);
  const [isCursorOnTop, setIsCursorOnTop] = useState<null | boolean>(null);
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const { isUpOrEqual } = useBreakpoint();
  const isWebView = isUpOrEqual("md");
  const position = useRef<{ [key: string]: number }>({});

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
      "w-[252px]",
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
      item: task,
      height: dragImage.clientHeight + 4,
    });
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setDragImage(dragImage, xPosition, yPosition);
  };

  const checkIfCursorIsOnTop = (e: DragEvent) => {
    const listEl = listRef.current as HTMLLIElement;
    const clientY = e.clientY;
    const top = listEl.getBoundingClientRect().top;
    const bottom = listEl.getBoundingClientRect().bottom;
    const isCurrentCursorOnTop = clientY < top + (bottom - top) / 2;
    return isCurrentCursorOnTop;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // if dragging a column, bubble up the event to the parent
    if (!dragItem || (dragItem && !dragItem.item)) {
      return;
    }
    e.stopPropagation();
    const isCurrentCursorOnTop = checkIfCursorIsOnTop(e);
    setIsCursorOnTop(isCurrentCursorOnTop);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();

    if (dragItem?.item) {
      const isCurrentCursorOnTop = checkIfCursorIsOnTop(e);
      onDragEnter({
        columnId,
        index,
        position: isCurrentCursorOnTop ? "top" : "bottom",
      });
    } else {
      onDragEnter({ columnId, position: isCursorOnLeft ? "left" : "right" });
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();

    if (dragItem?.item) {
      onDrop(!!isCursorOnTop);
    } else {
      onDrop(isCursorOnLeft);
    }
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

  const handleUpdateTask = (newValue: string) => {
    onUpdateTask({ ...task, text: newValue });
  };

  const handleShowMenuButtonClick = () => {
    const listEl = listRef.current as HTMLLIElement;
    const { top, left, right, width } = listEl.getBoundingClientRect();
    const mViewport = 768;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const sidebarWidth = 250;
    const threshold = 16;
    if (windowWidth < mViewport) {
      position.current = {
        top: windowHeight / 4,
        left: windowWidth / 2 - width / 2,
      };
    } else {
      const center = windowWidth / 2;
      if (left <= center) {
        position.current = {
          top,
          left:
            left < sidebarWidth + threshold ? sidebarWidth + threshold : left,
        };
      } else {
        position.current = {
          top,
          right:
            windowWidth - right < threshold ? threshold : windowWidth - right,
        };
      }
    }
    setShowMiniMenu(true);
  };

  const opacity =
    !dragItem || (dragItem && dragItem.item?.id !== task.id)
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
      dragItem.item?.id !== task.id ||
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
      dragEnterItem.position === "bottom"
    ) {
      setIsCursorOnTop(false);
    }
  }, [dragEnterItem]);

  const isDraggedOver =
    dragItem &&
    dragEnterItem &&
    dragItem.item &&
    (dragEnterItem.columnId !== columnId ||
      dragItem.columnId !== columnId ||
      dragEnterItem.index !== index ||
      dragItem.item.id !== task.id) &&
    dragEnterItem.columnId === columnId &&
    opacity === 1 &&
    dragEnterItem?.index === index;

  return (
    <Fragment>
      <li
        ref={listRef}
        className={clsx(
          "relative w-[252px] pointer-events-auto cursor-auto group",
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
      >
        {isDraggedOver && isCursorOnTop === true && (
          <div
            className="w-full h-10 bg-gray-300 rounded-lg mb-2 pointer-events-none hover:bg-gray-400"
            style={{
              height: dragItem?.height
                ? `calc(${dragItem?.height}px - 2px)`
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
              height: dragItem?.height
                ? `calc(${dragItem?.height}px - 2px)`
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
          onClick={handleShowMenuButtonClick}
        >
          <TbPencil />
        </button>
        {showMiniMenu && (
          <FixedPopOver
            position={position.current}
            onClose={() => setShowMiniMenu(false)}
          >
            <CardOptionsMiniMenu
              task={task.text}
              columnId={columnId}
              index={index}
              onClose={() => setShowMiniMenu(false)}
              updateTask={handleUpdateTask}
            />
          </FixedPopOver>
        )}
      </li>
      {isCursorOnTop == false &&
        dragEnterItem &&
        dragEnterItem.columnId === columnId &&
        dragEnterItem.index === index &&
        dragItem &&
        dragItem.item?.id === task.id &&
        opacity === 0 && (
          <div
            className={clsx(
              "w-[252px] bg-gray-300 rounded-lg pointer-events-none my-1"
            )}
            style={{
              height: dragItem?.height
                ? `calc(${dragItem?.height}px - 2px)`
                : 40,
            }}
            data-draggedover={true}
          ></div>
        )}
    </Fragment>
  );
};

export default TaskCard;
