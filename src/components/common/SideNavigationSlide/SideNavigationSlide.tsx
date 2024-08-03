"use client";

import { createPortal } from "react-dom";
import { Fragment, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import ClickAwayListener from "../ClickAwayLIstener/ClickAwayListener";
import Backdrop from "../Backdrop/Backdrop";
import { on } from "events";

const SideNavigationSlide = ({
  show,
  children,
  showBackdrop = true,
  onClose,
  onClickBackdrop,
}: {
  show: boolean;
  children: ReactNode;
  showBackdrop?: boolean;
  onClose: () => void;
  onClickBackdrop?: () => void;
}) => {
  const handleBackdropClick = () => {
    if (onClickBackdrop) {
      onClickBackdrop();
    }
    onClose();
  };

  return createPortal(
    <Fragment>
      <AnimatePresence>
        {show && (
          <ClickAwayListener onClickAway={onClose}>
            <motion.div
              className="fixed top-0 left-0 w-[250px] h-screen py-4 bg-white shadow-md"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                duration: 0.25,
                stiffness: 250,
                damping: 30,
              }}
            >
              {children}
            </motion.div>
          </ClickAwayListener>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && showBackdrop && (
          <Backdrop show={show} onClick={handleBackdropClick} />
        )}
      </AnimatePresence>
    </Fragment>,
    document.getElementById("side-root")!
  );
};

export default SideNavigationSlide;
