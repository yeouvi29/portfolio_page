"use client";

import clsx from "clsx";
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

import { useBreakpoint } from "@/hooks/useBreakpoint";

import MoveOptions from "../MoveOptions/MoveOptions";

interface CardOptionsMiniMenuProps {
  task: string;
  index: number;
  columnId: string;
  onClose: () => void;
  updateTask: (task: string) => void;
}

const CardOptionsMiniMenu = ({
  task,
  index,
  columnId,
  onClose,
  updateTask,
}: CardOptionsMiniMenuProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>(task);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const { isDown } = useBreakpoint();
  const isMobileView = isDown("md");
  const handleChange = () => {
    setValue(textareaRef.current?.value || "");
  };

  const handleSubmit = () => {
    if (!value.trim()) {
      textareaRef.current?.focus();
      return;
    }
    updateTask(value);
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const textareaEl = textareaRef.current;
      textareaEl.style.height = "auto";
      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (textareaRef.current) {
      const textareaEl = textareaRef.current;
      textareaEl.select();
    }
  }, []);
  return (
    <Fragment>
      <div
        className={clsx(
          "w-[272px] md:w-full md:min-h-full",
          isMobileView && "screen-freeze"
        )}
      >
        <form
          className="w-[272px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            wrap="soft"
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-white p-2 rounded-lg resize-none outline-none"
          />
        </form>
        <div className="flex w-full mt-0.5 justify-between items-start">
          <button
            type="button"
            onClick={handleSubmit}
            className="min-w-max bg-blue-600 text-white rounded-md py-1 px-3 hover:bg-blue-700"
          >
            Save
          </button>
          <button
            className="min-w-max flex gap-2 items-center bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-400"
            onClick={() => setShowMoveOptions((prev) => !prev)}
          >
            <span className="inline">
              <FaArrowRightLong />
            </span>
            Move
          </button>
        </div>
        <AnimatePresence>
          {showMoveOptions && (
            <motion.div
              className="bg-gray-200 p-2 pt-3 mt-1 rounded-md w-full flex flex-col gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MoveOptions columnId={columnId} taskIndex={index} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default CardOptionsMiniMenu;
