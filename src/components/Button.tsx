import React from "react";

function Button({
  children,
  styles = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  styles?: "default" | "contrast";
}) {
  const style = {
    default: `          bg-gray-50  
         border-green-900 
         text-green-900 
        
          hover:bg-green-900 hover:text-gray-300 hover:border-green-950 hover:placeholder:text-gray-300 `,
    contrast: `bg-green-900 text-gray-300 border-green-950 hover:bg-gray-50 hover:text-green-900 placeholder:text-green-400 
    `,
  };
  return (
    <button
      className={`${style[styles]} disabled:opacity-50 not-disabled:cursor-pointer border rounded-sm font-semibold transition-all duration-300 ease-in-out font-segoe h-[50px] px-2`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
