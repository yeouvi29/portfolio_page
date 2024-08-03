"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import ClickAwayListener from "@/components/common/ClickAwayLIstener/ClickAwayListener";

const Title = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleInput, setTitleInput] = useState("Task Management");
  const [isEditable, setIsEditable] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);
  const lastSavedTitle = useRef(titleInput);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsEditable(false);
  };

  const handleClickAway = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    if (!isEditable) {
      return;
    }

    lastSavedTitle.current = titleInput;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditable]);

  useEffect(() => {
    if (!isEditable && !titleInput) {
      setTitleInput(lastSavedTitle.current);
    }
  }, [titleInput, isEditable]);

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const tempSpan = document.createElement("span");

    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "pre";
    tempSpan.style.fontSize = window.getComputedStyle(inputEl).fontSize;
    tempSpan.style.fontFamily = window.getComputedStyle(inputEl).fontFamily;
    tempSpan.style.fontWeight = window.getComputedStyle(inputEl).fontWeight;
    tempSpan.style.fontStyle = window.getComputedStyle(inputEl).fontStyle;
    tempSpan.style.letterSpacing =
      window.getComputedStyle(inputEl).letterSpacing;

    document.body.appendChild(tempSpan);

    tempSpan.textContent = inputEl.value || inputEl.placeholder;
    const width = tempSpan.offsetWidth + 9;

    setTitleWidth(width);
    document.body.removeChild(tempSpan);
  }, [titleInput]);

  return (
    <div className="w-full flex" onDragOver={(e) => e.preventDefault()}>
      <ClickAwayListener onClickAway={() => handleClickAway()}>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
            className={clsx(
              "text-lg font-bold bg-transparent font-display p-1 rounded-lg",
              !isEditable && "hidden"
            )}
            style={{ width: titleWidth }}
            onDragOver={(e) => e.preventDefault()}
          />
          <div
            ref={titleRef}
            className={clsx(
              "p-1 rounded-lg cursor-pointer hover:bg-slate-300/60",
              isEditable && "hidden"
            )}
            onClick={() => setIsEditable(true)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h1 className="text-lg whitespace-pre text-gray-600">
              {titleInput}
            </h1>
          </div>
        </form>
      </ClickAwayListener>
    </div>
  );
};

export default Title;
