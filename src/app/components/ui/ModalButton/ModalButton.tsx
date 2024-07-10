"use client";

import clsx from "clsx";
import { ReactNode, MouseEventHandler } from "react";

const ModalButton = ({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-12 h-12 min-w-12 flex justify-center items-center outline-none bg-transparent rounded-full p-[14px] hover:bg-white/20 active:bg-t-brown-dark/40 disabled:bg-transparent disabled:text-gray-60",
        className
      )}
    >
      {children}
    </button>
  );
};

export default ModalButton;
