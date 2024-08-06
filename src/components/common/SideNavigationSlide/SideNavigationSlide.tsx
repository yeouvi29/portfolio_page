"use client";

import { createPortal } from "react-dom";
import { Fragment, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import ClickAwayListener from "../ClickAwayLIstener/ClickAwayListener";
import Backdrop from "../Backdrop/Backdrop";

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
              data-fixed="true"
              className="fixed top-0 left-0 w-[250px] h-screen py-4 bg-white shadow-md z-20"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.25,
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
