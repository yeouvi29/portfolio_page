"use client";

import { ReactNode } from "react";
import ClickAwayListener from "../ClickAwayLIstener/ClickAwayListener";
import clsx from "clsx";

interface PopOverProps {
  className?: string;
  disabled?: boolean;
  parent: ReactNode;
  children: ReactNode;
  isPopOverShow: boolean;
  handlePopOverVisibility: (show: boolean) => void;
}

const PopOver = ({
  className,
  parent,
  disabled,
  children,
  isPopOverShow,
  handlePopOverVisibility,
}: PopOverProps) => {
  return (
    <div className={clsx("relative", !disabled && "cursor-pointer", className)}>
      <div
        className="relative"
        onClick={() => {
          if (disabled) return;
          handlePopOverVisibility(true);
        }}
      >
        {parent}
      </div>
      {isPopOverShow && (
        <ClickAwayListener
          className={clsx(
            "absolute -bottom-1 right-0 z-10 translate-y-full border-solid border-gray-300 border bg-white p-2"
          )}
          onClickAway={() => handlePopOverVisibility(false)}
        >
          {children}
        </ClickAwayListener>
      )}
    </div>
  );
};

export default PopOver;
