import { InputHTMLAttributes } from "react";
import { FormFieldProps } from "../../types/product";

interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FormFieldProps {}

const TextField = ({
  label,
  error,
  required,
  className = "",
  ...props
}: TextFieldProps) => {
  return (
    <div className="mb-4 sm:mb-6">
      <label
        htmlFor={props.id}
        className="mb-1.5 sm:mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`
          transition block w-full rounded-md sm:rounded-lg border-2 bg-white px-3 sm:px-4 py-3 sm:py-3 text-sm
          ${error ? "border-red-500" : "border-gray-200"}
          placeholder-gray-400 focus:border-blue-500 focus:outline-none
          ${className}
        `}
      />
      {error && <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
