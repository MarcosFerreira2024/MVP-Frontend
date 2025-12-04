import React from "react";
import Label from "./Label";

type ChangeEventHandler = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => void;

type TextAreaProps = {
  to: string;
  text: string;
  placeholder: string;
  rows: number;
  value: string;

  onChange: ChangeEventHandler;
};

function TextArea({
  to,
  text,
  placeholder,
  rows,
  value,
  onChange,
}: TextAreaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
  };

  return (
    <Label to={to} className="text-main" text={text}>
      <textarea
        id={to}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full text-green-900 px-3 transition-all duration-150 ease-out py-2 text-sm border border-green-900 rounded-md focus:outline-none focus:ring focus:ring-green-900 focus:ring-offset-0 resize-none placeholder-gray-400 font-semibold"
        rows={rows}
      />
    </Label>
  );
}

export default TextArea;
