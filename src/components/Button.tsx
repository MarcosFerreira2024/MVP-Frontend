import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: "default" | "contrast" | "opacity";
  size?: "default" | "sm" | "icon";
  icon?: React.ReactNode | string;
  justify?: "start" | "center" | "between";
  iconPosition?: "start" | "end";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  icon,
  justify = "center",
  iconPosition = "end",
  className,
  ...props
}) => {
  const variants = {
    default:
      "bg-gray-50 border-green-900 text-green-900 hover:bg-green-900 hover:text-gray-50 hover:border-green-950",
    contrast:
      "bg-green-900 text-gray-50 border-green-950 hover:bg-gray-50 hover:text-green-900",
    opacity: "bg-gray-100 border-gray-400 text-gray-400",
  };

  const sizes = {
    default: "min-h-[50px] px-4 rounded-md",
    sm: "h-9 px-3 rounded-lg text-sm",
    icon: "w-9 h-9 flex justify-center items-center rounded-md p-0",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <img
          src={icon}
          alt=""
          className="w-4 group-hover:invert-100 group-hover:grayscale-100 h-4 object-contain"
        />
      );
    }

    return <span className="flex items-center">{icon}</span>;
  };

  return (
    <button
      className={twMerge(
        clsx(variants[variant], sizes[size], justifyClasses[justify]),

        "border font-semibold transition-all duration-200 ease-in-out",
        "group cursor-pointer main-shadow",
        "text-nowrap",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2",
        "flex items-center gap-2",

        className
      )}
      {...props}
    >
      {icon && iconPosition === "start" && renderIcon()}
      {children && <span>{children}</span>}
      {icon && iconPosition === "end" && renderIcon()}
    </button>
  );
};

export default Button;
