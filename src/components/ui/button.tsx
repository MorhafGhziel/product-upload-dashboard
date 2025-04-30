import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = ({
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-md sm:rounded-lg px-4 py-3 font-medium transition-colors duration-200 cursor-pointer bg-gray-900 text-white hover:bg-gray-800";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button className={`${baseStyles} ${widthStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
