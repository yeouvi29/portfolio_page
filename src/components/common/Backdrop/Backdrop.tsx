"use client";

import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Backdrop = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick?: () => void;
}) => {
  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </AnimatePresence>,
    document.getElementById("backdrop-root")!
  );
};

export default Backdrop;
