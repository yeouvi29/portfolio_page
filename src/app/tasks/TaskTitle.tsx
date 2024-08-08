"use client";

import { DragEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { DragEnterItem } from "@/types";
import ClickAwayListener from "@/components/common/ClickAwayLIstener/ClickAwayListener";

const TaskTitle = ({
  title,
  columnId,
  tasksLength,
  onDragEnter,
  onTitleUpdate,
}: {
  title: string;
  columnId: string;
  tasksLength: number;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onTitleUpdate: (title: string, columnId: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(title);
  const [height, setHeight] = useState(0);
  const lastSavedTitle = useRef(value);
  const handleClickAway = () => {
    setIsEditable(false);
  };
  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    onDragEnter({
      columnId,
      index: tasksLength ? tasksLength - 1 : 0,
      addToBottom: true,
    });
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
  }, []);
  return (
    <div ref={divRef} className="w-[272px] p-1 relative">
      <ClickAwayListener onClickAway={() => handleClickAway()}>
        <textarea
          wrap="hard"
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          style={{ height }}
          onKeyDown={handleKeyDown}
          className={clsx(
            "hidden w-full h-fit absolute top-1 left-0 border-2 border-solid border-blue-500 py-1 px-2 rounded-lg font-bold text-gray-800 resize-none outline-none break-words",
            isEditable && "!block"
          )}
        />

        <h2
          ref={headingRef}
          className={clsx(
            "w-full font-bold font-sans text-base border-2 border-solid text-gray-800 px-1 py-1 whitespace-normal break-words cursor-pointer"
          )}
          style={{ overflowWrap: "anywhere" }}
          onClick={() => setIsEditable(true)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
        >
          {value}
        </h2>
      </ClickAwayListener>
    </div>
  );
};
export default TaskTitle;
