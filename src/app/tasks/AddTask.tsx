"use client";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
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
import ClickAwayListener from "@/components/common/ClickAwayLIstener/ClickAwayListener";
interface NewTask {
  text: string;
}
const AddTask = ({
  columnId,
  isListDragged,
  isCursorOnLeft,
  tasksLength,
}: {
  columnId: string;
  isListDragged: boolean;
  isCursorOnLeft: boolean;
  tasksLength: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTask, setNewTask] = useState<NewTask | null>(null);
  const [taskItems, dragStartItem, setTaskItems, setDragEnterItem] =
    useTaskItems(({ items, drag: { start }, setTaskItems, setDragEnter }) => [
      items,
      start,
      setTaskItems,
      setDragEnter,
    ]);
  const newTaskRef = useRef(newTask);
  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    if (isListDragged) {
      setDragEnterItem({
        columnId,
        position: isCursorOnLeft ? "left" : "right",
      });
    } else {
      setDragEnterItem({
        columnId,
        index: tasksLength ? tasksLength - 1 : 0,
        position: "bottom",
      });
    }
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ text: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          className={clsx(
            "w-[252px] mt-2 mx-2 p-2 rounded-lg text-left",
            !dragStartItem && "hover:bg-gray-400/30"
          )}
          onClick={handleClick}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          data-draggedover={true}
        >
          + Add a card
        </button>
      )}
      {newTask && (
        <ClickAwayListener onClickAway={handleClickAway} className="px-2">
          <div
            className={clsx(
              "w-[252px] bg-white rounded-lg  my-1 overflow-hidden"
            )}
            style={{ minHeight: 40 }}
            data-draggedover={true}
          >
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={newTask?.text || ""}
                placeholder="Enter a task for this card..."
                className="w-full h-full p-2 outline-none"
                onChange={handleChange}
                data-testid="add-task-input"
              />
            </form>
          </div>

          <div className="w-full mt-2 h-[32px] flex gap-2 items-center">
            <button
              className="h-full bg-blue-500 px-2 rounded-md text-white"
              onClick={handleClickOnAddCard}
            >
              Add card
            </button>
            <button
              className="hover:bg-gray-400/30 rounded-md h-full aspect-square text-[20px] text-gray-600 flex items-center justify-center"
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
