"use client";

import { type ElementRef, useEffect, useRef, ReactNode, Fragment } from "react";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

import styles from "./styles.module.css";

const Modal = ({
  className,
  header,
  children,
  onClose,
  scrollPosition,
  hideCloseButton,
  closeOnBackdropClick = true,
}: {
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  onClose?: (e: any) => void;
  scrollPosition?: null | number;
  hideCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}) => {
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const handleBackdropClick = (e: any) => {
    e.stopPropagation();
    if (closeOnBackdropClick && onClose) {
      onClose(e);
    }
  };
  const handleDismiss = (e: any) => {
    e.stopPropagation();
    if (onClose) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      if (scrollPosition && window) {
        window.scrollTo({ top: scrollPosition });
      }
    }
  }, []);

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <dialog
        ref={dialogRef}
        className={clsx(
          "modal",
          styles.modal,
          "relative z-[1000] min-w-[100vw] min-h-[100%] md:min-w-[80%] md:min-h-[auto] md:max-h-[80vh] border-none bg-[rgba(207,195,184,0.8)] flex flex-col",
          className
        )}
        onClose={handleDismiss}
      >
        <div className="w-full h-16 flex justify-end p-3 items-center">
          {header && <div className="modalHeader flex-grow">{header}</div>}
          {hideCloseButton ? null : (
            <button
              onClick={handleDismiss}
              className={clsx(
                "w-12 h-12 min-w-12 bg-transparent rounded-full p-[14px] hover:bg-white/20 active:bg-t-brown-dark/40 flex justify-center items-center outline-none"
              )}
            >
              <IoClose className="text-xl text-white" />
            </button>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            "flex-grow w-full  sm:h-[calc(70svh-64px)] bg-[rgba(207,195,184,0.8)] overflow-hidden max-h-[calc(100svh-64px)] flex flex-col"
          }
        >
          {children}
        </div>
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
};
export default Modal;
