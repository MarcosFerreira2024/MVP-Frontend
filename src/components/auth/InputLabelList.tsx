import React from "react";
import Label from "../Label";
import Input from "../Input";

type inputTypes = "email" | "password" | "text";

export type InputData = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  type: inputTypes;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputLabelListProps = {
  data: InputData[];
};

function InputLabelList({ data }: InputLabelListProps) {
  return (
    <>
      {data.map((item) => (
        <Label key={item.id} text={item.label} to={item.id}>
          <Input
            id={item.id}
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            value={item.value}
            onChange={item.onChange}
          />
        </Label>
      ))}
    </>
  );
}

export default InputLabelList;
