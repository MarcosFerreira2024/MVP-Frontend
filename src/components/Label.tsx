import React from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  to: string;
  text: string;
  className?: string;
  children: React.ReactNode;
};

function Label({ to, text, className, children }: LabelProps) {
  return (
    <label
      htmlFor={to}
      className={twMerge(
        `text-secundary group relative duration-300 ease-in-out transition-all  flex flex-col gap-2 w-full`,
        className
      )}
    >
      {text}:{children}
    </label>
  );
}

export default Label;
