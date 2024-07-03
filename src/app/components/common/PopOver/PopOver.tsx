"use client";

import { ReactNode, useState } from "react";
import ClickAwayListener from "../ClickAwayLIstener/ClickAwayListener";
import clsx from "clsx";

interface PopOverProps {
  parent: ReactNode;
  children: ReactNode;
  isPopOverShow: boolean;
  handlePopOverVisibility: (show: boolean) => void;
}

const PopOver = ({
  parent,
  children,
  isPopOverShow,
  handlePopOverVisibility,
}: PopOverProps) => {
  return (
    <div className="relative z-0 isolate">
      <div
        className="relative z-0"
        onClick={() => {
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
