"use client";

import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";

import Backdrop from "@/components/common/Backdrop/Backdrop";
import FixedPopOver from "@/components/common/FixedPopOver/FIxedPopUp";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";

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
  const [value, setValue] = useState<string>(task);
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
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-md py-1 px-3 mt-0.5"
        >
          Save
        </button>
      </div>
    </Fragment>
  );
};

export default CardOptionsMiniMenu;
