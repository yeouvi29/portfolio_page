"use client";
import {
  DragEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { IoClose } from "react-icons/io5";

import { useTaskItems } from "@/store";
import { TaskItems } from "@/types";
import ClickAwayListener from "@/app/components/common/ClickAwayLIstener/ClickAwayListener";
interface NewTask {
  text: string;
}
const AddTask = ({
  columnId,
  tasksLength,
}: {
  columnId: string;
  tasksLength: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [setDragEnterItem] = useTaskItems(({ setDragEnter }) => [setDragEnter]);
  const [newTask, setNewTask] = useState<NewTask | null>(null);
  const [taskItems, setTaskItems] = useTaskItems(({ items, setTaskItems }) => [
    items,
    setTaskItems,
  ]);
  const newTaskRef = useRef(newTask);
  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();

    setDragEnterItem({
      columnId,
      index: tasksLength ? tasksLength - 1 : 0,
      addToBottom: true,
    });
  };

  const handleClick = () => {
    setNewTask({ text: "" });
  };

  const handleClose = () => {
    setNewTask(null);
  };

  const updateTask = (text: string) => {
    const task = {
      id: uuidv4(),
      text: text || "",
    };
    const updatedTasks = taskItems.map((item: TaskItems) => {
      if (item.id === columnId) {
        return {
          ...item,
          items: [...item.items, task],
        };
      }
      return item;
    });

    setTaskItems(updatedTasks);
  };
  const handleClickOnAddCard = () => {
    if (newTask?.text.trim() === "") {
      setNewTask(null);
      return;
    }
    if (newTask) {
      updateTask(newTask.text.trim());
    }
    setNewTask({ text: "" });
  };

  const handleClickAway = useCallback(() => {
    const task = newTaskRef.current?.text.trim() || "";

    if (task) {
      updateTask(task);
    }
    setNewTask(null);
  }, [updateTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ text: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTask || newTask.text.trim() === "") {
      setNewTask(null);
      return;
    }

    updateTask(newTask.text.trim());
    setNewTask(null);
  };

  useEffect(() => {
    if (!newTask) return;
    newTaskRef.current = newTask;
    if (newTask.text.trim() === "") {
      inputRef.current?.focus();
    }
  }, [newTask]);

  return (
    <Fragment>
      {!newTask && (
        <button
          className="w-full mt-2 p-2 rounded-lg text-left hover:bg-gray-400/30"
          onClick={handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
        >
          + Add a card
        </button>
      )}
      {newTask && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div
            className={clsx(
              "w-[272px] bg-white rounded-lg  my-1 overflow-hidden"
            )}
            style={{ minHeight: 40 }}
            data-draggedover={true}
          >
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={newTask?.text || ""}
                className="w-full h-full p-2 outline-none"
                onChange={handleChange}
              />
            </form>
          </div>

          <div className="w-full mt-2 h-[32px] flex gap-2 items-center">
            <button
              className="h-full bg-blue-600 px-2 rounded-md text-white"
              onClick={handleClickOnAddCard}
            >
              Add card
            </button>
            <button
              className="hover:bg-gray-400/30 rounded-md h-full aspect-square text-[20px] text-gray-800 flex items-center justify-center"
              onClick={handleClose}
            >
              <IoClose />
            </button>
          </div>
        </ClickAwayListener>
      )}
    </Fragment>
  );
};

export default AddTask;
