"use client";

import Backdrop from "@/components/common/Backdrop/Backdrop";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";

import {
  FormEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[272px] z-10 md:absolute md:top-0 md:left-0 md:w-full md:min-h-full md:translate-x-0 md:translate-y-0",
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
      <Backdrop show onClick={onClose} />
    </Fragment>
  );
};

export default CardOptionsMiniMenu;
