import clsx from "clsx";
import { ReactNode } from "react";
import { LuSearch } from "react-icons/lu";
interface TextFieldProps {
  icon?: ReactNode;
  label?: string;
  value: string;
  error?: boolean;
  defaultValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: ReactNode;
}
const TextField = ({
  icon,
  label,
  value,
  defaultValue,
  error,
  onChange,
  placeholder,
  helperText,
}: TextFieldProps) => {
  return (
    <div className="w-full relative">
      {label && (
        <label className="absolute -top-1 left-1 -translate-y-full text-xs text-gray-600 font-semibold">
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex pl-2 items-center gap-2 border bg-white border-gray-300 rounded-md overflow-hidden  focus-within:bg-blue-100",
          error && "bg-red-200"
        )}
      >
        {icon ? icon : <LuSearch className="w-5 min-w-5 text-gray-300" />}
        <input
          className="py-2 pr-2 min-w-full flex-grow outline-none bg-transparent"
          type="text"
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
