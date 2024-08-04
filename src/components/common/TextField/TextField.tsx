import clsx from "clsx";
import { ReactNode } from "react";
import { LuSearch } from "react-icons/lu";
interface TextFieldProps {
  className?: string;
  icon?: ReactNode;
  label?: string;
  value: string;
  error?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: ReactNode;
}
const TextField = ({
  className,
  icon,
  label,
  value,
  defaultValue,
  error,
  disabled,
  onChange,
  placeholder,
  helperText,
}: TextFieldProps) => {
  return (
    <div className={clsx("relative", className)}>
      {label && (
        <label className="absolute -top-1 left-1 -translate-y-full text-xs text-gray-600 font-semibold">
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex pl-2 items-center gap-2 border bg-white border-gray-300 rounded-md overflow-hidden  focus-within:bg-blue-100",
          error && "bg-red-200",
          disabled && "!bg-gray-300 text-gray-400 cursor-not-allowed"
        )}
      >
        {icon ? (
          icon
        ) : (
          <LuSearch className="w-4 min-w-4 h-4 mt-0 md:mt-1 text-gray-400" />
        )}
        <input
          className="h-[38.5px] md:h-[44px] py-2 pr-2 m-auto min-w-full flex-grow outline-none bg-transparent"
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {helperText && (
        <div className="absolute bottom-0 left-1 translate-y-full">
          {helperText}
        </div>
      )}
    </div>
  );
};
export default TextField;
