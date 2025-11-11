import React from "react";

type LabelProps = {
  to: string;
  text: string;
  children: React.ReactNode;
};

function Label({ to, text, children }: LabelProps) {
  return (
    <label
      htmlFor={to}
      className="text-gray-50 group relative duration-300 ease-in-out transition-all  flex flex-col gap-2 min-w-full font-segoe font-semibold"
    >
      {text}:{children}
    </label>
  );
}

export default Label;
