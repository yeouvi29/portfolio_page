import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Switch = ({
  leftText,
  rightText,
  defaultChecked,
  disabled,
  onChange,
}: {
  leftText?: ReactNode;
  rightText?: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (isOn: boolean) => void;
}) => {
  const [isOn, setIsOn] = useState(defaultChecked || false);

  const toggleSwitch = () => {
    if (disabled) return;
    if (onChange) {
      onChange(!isOn);
    }
    setIsOn(!isOn);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="flex gap-2 align-center">
      {leftText || null}
      <div
        className={clsx(
          "w-12 h-6 rounded-full bg-blue-100 flex px-1 cursor-pointer items-center",
          isOn ? "justify-end" : "justify-start",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={toggleSwitch}
      >
        <motion.div
          className={clsx(
            "w-5 h-5 bg-blue-600 rounded-full",
            disabled && "opacity-50"
          )}
          layout
          transition={spring}
        />
      </div>
      {rightText || null}
    </div>
  );
};
export default Switch;
