import React, { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative group flex items-center flex-1  transition-all duration-300 ease-in-out   rounded-sm   ">
      <input
        autoComplete="off"
        ref={ref}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
        className={twMerge(
          `flex-1 min-h-[50px] px-2 pr-10 focus:outline-none focus:ring-1 placeholder:text-gray-400 rounded-sm border text-base border-green-900 hover:bg-green-900 hover:text-gray-300 hover:border-green-950 hover:placeholder:text-gray-300  text-main bg-gray-50 transition-all duration-300 ease-in-out `,
          props.className
        )}
      />
      <AnimatePresence mode="wait">
        {props.type === "password" && (
          <motion.img
            key={showPassword ? "eye-off" : "eye"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            src={showPassword ? "eye-off.svg" : "eye.svg"}
            onClick={() => setShowPassword(!showPassword)}
            alt="Mostrar/Esconder senha"
            className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:invert group-hover:grayscale-100 cursor-pointer"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default Input;
