"use client";

import { DragEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { DragEnterItem, DragStartItem } from "@/types";
import ClickAwayListener from "@/components/common/ClickAwayLIstener/ClickAwayListener";
import FixedPopOver from "@/components/common/FixedPopOver/FIxedPopUp";
import ListOptionMenu from "@/components/ui/ListOptionMenu/ListOptionsMenu";
import { useDropTask } from "@/hooks/useDropTask";

const TaskTitle = ({
  title,
  columnId,
  dragItem,
  isCursorOnLeft,
  tasksLength,
  onDragStart,
  onDragEnter,
  onDrop,
  onTitleUpdate,
}: {
  title: string;
  columnId: string;
  dragItem: DragStartItem | null;
  isCursorOnLeft: boolean;
  tasksLength: number;
  onDragStart: (e: DragEvent) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDrop: (e: DragEvent) => void;
  onTitleUpdate: (title: string, columnId: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(title);
  const [height, setHeight] = useState(0);
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const lastSavedTitle = useRef(value);
  const position = useRef<{ [key: string]: number }>({});

  const handleClickAway = () => {
    setIsEditable(false);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    if (dragItem?.item) {
      onDragEnter({
        columnId,
        index: tasksLength ? tasksLength - 1 : 0,
        position: "bottom",
      });
    } else {
      onDragEnter({
        columnId,
        position: isCursorOnLeft ? "left" : "right",
      });
    }
  };

  const handleSubmit = () => {
    onTitleUpdate(value, columnId);
    setIsEditable(false);
  };

  const handleChange = () => {
    setValue(textareaRef.current?.value || "");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (headingRef.current) {
      const headingEl = headingRef.current;
      setHeight(headingEl.offsetHeight);
    }
  }, [value]);

  useEffect(() => {
    if (!isEditable) {
      return;
    }

    lastSavedTitle.current = value;
    textareaRef.current?.focus();
    textareaRef.current?.select();
  }, [isEditable]);

  useEffect(() => {
    if (headingRef.current) {
      setHeight(headingRef.current.offsetHeight);
    }
    if (divRef.current) {
      const wrapperEl = divRef.current;
      const { top, left, right, width, height } =
        wrapperEl.getBoundingClientRect();
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
            top: top + height,
            left:
              left < sidebarWidth + threshold ? sidebarWidth + threshold : left,
          };
        } else {
          position.current = {
            top: top + height,
            right:
              windowWidth - right < threshold ? threshold : windowWidth - right,
          };
        }
      }
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="w-[272px] p-1 relative flex gap-1"
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      <ClickAwayListener
        onClickAway={() => handleClickAway()}
        className="flex-grow"
      >
        <textarea
          wrap="hard"
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          style={{ height }}
          onKeyDown={handleKeyDown}
          className={clsx(
            "hidden w-[calc(100%-36px)] h-fit absolute top-1 left-0 border-2 border-solid border-blue-500 py-1 px-2 rounded-lg font-bold text-gray-800 resize-none outline-none break-words",
            isEditable && "!block"
          )}
        />

        <h2
          ref={headingRef}
          className={clsx(
            "w-full font-bold font-sans text-base border-2 border-solid text-gray-800 p-1 whitespace-normal break-words cursor-pointer"
          )}
          style={{ overflowWrap: "anywhere" }}
          onClick={() => setIsEditable(true)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
        >
          {value}
        </h2>
      </ClickAwayListener>
      <button
        className="min-w-8 h-8 mt-0.5 flex justify-center items-center rounded-lg hover:bg-gray-400/30 hover:cursor-pointer"
        onClick={() => setShowOptionMenu((prev) => !prev)}
      >
        <BiDotsHorizontalRounded />
      </button>
      {showOptionMenu && (
        <FixedPopOver
          position={position.current}
          onClose={() => setShowOptionMenu(false)}
        >
          <ListOptionMenu
            columnId={columnId}
            onClose={() => setShowOptionMenu(false)}
          />
        </FixedPopOver>
      )}
    </div>
  );
};
export default TaskTitle;
