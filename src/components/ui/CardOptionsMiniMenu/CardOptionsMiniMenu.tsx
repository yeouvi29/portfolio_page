"use client";

import clsx from "clsx";
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { IoWarning } from "react-icons/io5";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTaskItems } from "@/store";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskItems, setTaskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);
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
  const hideDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const deleteTask = () => {
    const newTaskItems = taskItems.map((item) => {
      if (item.id === columnId) {
        return {
          ...item,
          items: item.items.filter((_, i) => i !== index),
        };
      }
      return item;
    });

    setTaskItems(newTaskItems);
    onClose();
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
          "w-[252px] md:w-full md:min-h-full",
          isMobileView && "screen-freeze"
        )}
      >
        <form
          className="w-[252px]"
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
          <div>
            <div className="relative">
              <button
                className="min-w-full flex gap-2 items-center bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-400"
                onClick={() => setShowMoveOptions((prev) => !prev)}
              >
                <span className="inline">
                  <FaArrowRightLong />
                </span>
                Move
              </button>
              <AnimatePresence>
                {showMoveOptions && (
                  <motion.div
                    className="absolute -bottom-2 right-0 translate-y-full w-[252px] bg-gray-200 p-2 rounded-md flex flex-col gap-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MoveOptions
                      columnId={columnId}
                      taskIndex={index}
                      taskItems={taskItems}
                      updateTaskItems={setTaskItems}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="min-w-full mt-2 flex gap-2 items-center bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-400 text-red-500"
              onClick={() => setShowDeleteModal((prev) => !prev)}
            >
              <span className="inline">
                <MdOutlineDelete />
              </span>
              Delete
            </button>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <AnimatePresence>
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={hideDeleteModal}
          >
            <div className="w-[300px] p-4 bg-white rounded-lg">
              <p>
                <span className="inline text-gray-600 text-2xl">
                  <IoWarning />
                </span>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
              <div className="flex w-full gap-2 mt-4">
                <button
                  className="flex-grow p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={hideDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="flex-grow p-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
                  onClick={deleteTask}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </Fragment>
  );
};

export default CardOptionsMiniMenu;
