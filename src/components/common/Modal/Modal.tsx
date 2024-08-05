"use client";

import {
  type ElementRef,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
} from "react";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

import styles from "./styles.module.css";
import ModalButton from "../../ui/ModalButton/ModalButton";

const Modal = ({
  className,
  fullScreen,
  header,
  children,
  onClose,
  scrollPosition,
  hideCloseButton,
  closeOnBackdropClick = true,
}: {
  className?: string;
  fullScreen?: boolean;
  header?: ReactNode;
  children: ReactNode;
  onClose?: (e: any) => void;
  scrollPosition?: null | number;
  hideCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}) => {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const style: CSSProperties = fullScreen
    ? { width: "100vw", maxWidth: "100vw", height: "100vh", maxHeight: "100vh" }
    : {};
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
        style={style}
        className={clsx(
          "modal",
          styles.modal,
          "rounded-none md:rounded-md relative z-[1000] min-w-[100vw] min-h-[100%] md:min-w-[80%] md:min-h-[auto] md:max-h-[80vh] border-none bg-gray-200/70 flex flex-col",
          className
        )}
        onClose={handleDismiss}
      >
        <div className="w-full h-16 flex justify-end p-3 items-center">
          {header && <div className="modalHeader flex-grow">{header}</div>}
          {hideCloseButton ? null : (
            <ModalButton onClick={handleDismiss}>
              <IoClose className="text-xl text-white" />
            </ModalButton>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            "modalContent flex-grow w-full  sm:h-[calc(70svh-64px)] bg-gray-200 overflow-hidden max-h-[calc(100svh-64px)] flex flex-col"
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
