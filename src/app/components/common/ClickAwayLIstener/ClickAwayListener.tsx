"use client";

import { useCallback, useEffect, useRef } from "react";

interface ClickAwayListenerProps {
  className?: string;
  children: React.ReactNode;
  onClickAway: () => void;
}

const ClickAwayListener = ({
  className,
  children,
  onClickAway,
}: ClickAwayListenerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickAway();
      }
    },
    [onClickAway]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ClickAwayListener;
