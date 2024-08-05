"use client";

import Backdrop from "@/components/common/Backdrop/Backdrop";

import { FormEvent, Fragment, useEffect, useRef } from "react";
interface CardOptionsMiniMenuProps {
  task: string;
  onClose: () => void;
  updateTask: (task: string) => void;
}
const CardOptionsMiniMenu = ({
  task,
  onClose,
  updateTask,
}: CardOptionsMiniMenuProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateValue = () => {
    const newValue = textareaRef.current?.value;
    console.log(newValue);
    if (!newValue) {
      textareaRef.current?.focus();
      return;
    }
    updateTask(newValue);
    onClose();
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateValue();
  };
  useEffect(() => {
    if (textareaRef.current) {
      const textareaEl = textareaRef.current;
      textareaEl.select();
      textareaEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          updateValue();
        }
      });
      return () => textareaEl.removeEventListener("keydown", () => {});
    }
  }, []);
  return (
    <Fragment>
      <div className="absolute top-0 left-0 w-full min-h-full z-10">
        <form className="w-[272px]" onSubmit={handleSubmit}>
          <textarea
            wrap="soft"
            ref={textareaRef}
            className="w-full bg-white p-2 rounded-lg resize-none outline-none"
          >
            {task}
          </textarea>
        </form>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-md py-1 px-3 mt-0.5"
        >
          Save
        </button>
      </div>
      <Backdrop show onClick={onClose} />
    </Fragment>
  );
};

export default CardOptionsMiniMenu;
