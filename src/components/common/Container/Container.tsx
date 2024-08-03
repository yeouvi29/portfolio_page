import clsx from "clsx";
import { ReactNode } from "react";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("container mx-auto max-w-7xl px-4 lg:px-5", className)}>
      {children}
    </div>
  );
};
