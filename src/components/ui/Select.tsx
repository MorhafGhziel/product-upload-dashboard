import { useState, useRef, useEffect } from "react";
import { CategoryOption } from "../../types/product";

interface SelectProps {
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: CategoryOption[];
  name: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
}

const Select = ({
  value,
  onChange,
  options,
  name,
  id,
  placeholder = "Select category",
  error,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .dropdown-enter {
            animation: slideIn 0.2s ease-out forwards;
          }
        `}
      </style>
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-full rounded-md sm:rounded-lg border-2 bg-white px-3 sm:px-4 py-3 sm:py-3 text-left text-sm
            transition-all duration-200 ease-in-out
            ${error ? "border-red-500" : "border-gray-200"}
            focus:border-blue-500 focus:outline-none
            hover:border-gray-300
          `}
        >
          <span
            className={`${
              selectedOption ? "text-gray-900" : "text-gray-400"
            } transition-colors duration-200`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-4">
            <svg
              className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md sm:rounded-lg border border-gray-200 bg-white shadow-lg dropdown-enter">
            <div className="max-h-48 sm:max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`
                    w-full px-3 sm:px-4 py-3 sm:py-3 text-left text-sm
                    transition-colors duration-200 ease-in-out
                    ${value === option.value ? "bg-gray-100" : "bg-white"}
                    hover:bg-gray-50
                  `}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
