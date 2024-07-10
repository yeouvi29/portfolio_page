import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import clsx from "clsx";
interface RangeProps {
  animate?: boolean;
  value: { min: number; max: number };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  range: { min: number; max: number };
  step?: number;
}
const Range = ({ animate, value, onChange, range, step }: RangeProps) => {
  const [width, setWidth] = useState<number>(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const multiply = width / (range.max - range.min);
  const start = (value.min - range.min) * multiply;
  const rangeWidth = (value.max - value.min) * multiply;

  useEffect(() => {
    const parentEl = parentRef.current;
    if (parentEl) {
      const rect = parentEl.getBoundingClientRect();
      const width = rect.width;
      setWidth(width);

      window.addEventListener("resize", () => {
        const rect = parentEl.getBoundingClientRect();
        const width = rect.width;
        setWidth(width);
      });

      return () => window.removeEventListener("resize", () => {});
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className="w-full h-2 bg-gray-200 relative rounded-full overflow-hidden"
    >
      <motion.div
        className={clsx(
          "absolute top-0 overflow-hidden rounded-full  h-full",
          styles.rangeBar
        )}
        style={{ width: rangeWidth, left: start }}
        initial={{ scaleX: animate ? 0 : 1 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        <div
          className={clsx(
            "rounded-full absolute top-0 w-full h-full",
            styles.rangeBarBackground
          )}
          style={{ width, left: 0 - start }}
        />
      </motion.div>
    </div>
  );
};

export default Range;
