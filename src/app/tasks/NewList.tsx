import { useEffect, useRef, useState, KeyboardEvent } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

import ClickAwayListener from "@/components/common/ClickAwayLIstener/ClickAwayListener";

const NewList = ({ addNewList }: { addNewList: (title: string) => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");
  const [height, setHeight] = useState(0);
  const lastSavedTitle = useRef(value);
  const handleClickAway = () => {
    setIsEditable(false);
  };

  const handleSubmit = () => {
    addNewList(value);
    setValue("");
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

  const handleClose = () => {
    setValue("");
    setIsEditable(false);
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
    <li className="min-h-[calc(100vh-180px)] px-2">
      <div
        className={clsx(
          "px-2.5 flex flex-col h-fit rounded-lg",
          isEditable
            ? "bg-gray-200 py-2.5"
            : "bg-gray-200/30 hover:bg-gray-600/30 hover:cursor-pointer"
        )}
      >
        <div className="w-[272px] p-1 relative">
          <ClickAwayListener onClickAway={() => handleClickAway()}>
            <textarea
              wrap="hard"
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              style={{ height }}
              onKeyDown={handleKeyDown}
              className={clsx(
                "hidden w-full h-fit absolute top-sdf1 left-0 border-2 border-solid border-blue-500 py-1 px-2 rounded-lg font-bold text-gray-800 resize-none outline-none break-words",
                isEditable && "!block"
              )}
            />

            <h2
              ref={headingRef}
              className={clsx(
                "w-full font-normal font-sans text-base border-solid text-gray-600",
                "px-1.5 py-2.5"
              )}
              onClick={() => setIsEditable(true)}
              style={{ overflowWrap: "anywhere" }}
            >
              {value || "+ Add another list"}
            </h2>

            {isEditable && (
              <div className={"w-full mt-2 h-[32px] flex gap-2 items-center"}>
                <button
                  className="h-full bg-blue-500 px-2 rounded-md text-white"
                  onClick={handleSubmit}
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
            )}
          </ClickAwayListener>
        </div>
      </div>
    </li>
  );
};

export default NewList;
