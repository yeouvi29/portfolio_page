"use client";

import { ReactNode } from "react";
import ClickAwayListener from "../ClickAwayLIstener/ClickAwayListener";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface PopOverProps {
  className?: string;
  childClassName?: string;
  disabled?: boolean;
  parent: ReactNode;
  children: ReactNode;
  isPopOverShow: boolean;
  handlePopOverVisibility: (show: boolean) => void;
}

const PopOver = ({
  className,
  childClassName,
  parent,
  disabled,
  children,
  isPopOverShow,
  handlePopOverVisibility,
}: PopOverProps) => {
  return (
    <div
      className={clsx(
        "popOver",
        "relative",
        !disabled && "cursor-pointer",
        className
      )}
    >
      <div
        className="relative"
        onClick={() => {
          if (disabled) return;
          handlePopOverVisibility(true);
        }}
      >
        {parent}
      </div>
      <AnimatePresence>
        {isPopOverShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <ClickAwayListener
              className={clsx(
                "clickAwayListener",
                "absolute -bottom-1 right-0 z-10 translate-y-full border-solid border-gray-300 border bg-white p-2 rounded-md",
                childClassName
              )}
              onClickAway={() => {
                handlePopOverVisibility(false);
              }}
            >
              {children}
            </ClickAwayListener>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopOver;
