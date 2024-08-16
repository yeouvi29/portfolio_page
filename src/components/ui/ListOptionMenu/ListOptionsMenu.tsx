"use client";

import clsx from "clsx";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { IoWarning } from "react-icons/io5";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTaskItems } from "@/store";

import ListMoveOptions from "../ListMoveOptions/ListMoveOptions";

interface ListOptionMenu {
  columnId: string;
  onClose: () => void;
}

const ListOptionMenu = ({ columnId, onClose }: ListOptionMenu) => {
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskItems, setTaskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);
  const { isDown } = useBreakpoint();
  const isMobileView = isDown("md");

  const hideDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const deleteTask = () => {
    const newTaskItems = taskItems.filter((item) => item.id !== columnId);

    setTaskItems(newTaskItems);
    onClose();
  };

  return (
    <Fragment>
      <div
        className={clsx(
          "w-[252px] md:w-full md:min-h-full",
          isMobileView && "screen-freeze"
        )}
      >
        <div className="flex w-[252px] mt-0.5 justify-end items-start">
          <div>
            <div className="relative">
              <button
                className="min-w-[252px] flex gap-2 items-center bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-400"
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
                    <ListMoveOptions
                      columnId={columnId}
                      taskItems={taskItems}
                      updateTaskItems={setTaskItems}
                      onClose={onClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="min-w-[252px] mt-2 flex gap-2 items-center bg-gray-300 rounded-md py-1 px-3 hover:bg-gray-400 text-red-500"
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

export default ListOptionMenu;
