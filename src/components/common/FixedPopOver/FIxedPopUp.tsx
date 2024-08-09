import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

const FixedPopOver = ({
  children,
  className,
  position,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };

  onClose?: () => void;
}) => {
  const popupPosition: { [key: string]: number } = {};
  if (position.top) {
    popupPosition.top = position.top;
  }
  if (position.left) {
    popupPosition.left = position.left;
  }
  if (position.right) {
    popupPosition.right = position.right;
  }
  if (position.bottom) {
    popupPosition.bottom = position.bottom;
  }
  return createPortal(
    <Fragment>
      <div className={clsx("fixed", className)} style={popupPosition}>
        {children}
      </div>
      <Backdrop show onClick={onClose} />
    </Fragment>,
    document.getElementById("popup-root")!
  );
};
export default FixedPopOver;
