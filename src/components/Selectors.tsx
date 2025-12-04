import React from "react";

function Selectors({
  selected,
  value,
  label,
  handleSelection,
}: {
  selected: boolean;
  value: string;
  label: string;
  handleSelection: (value: string) => void;
}) {
  return (
    <button
      onClick={() => handleSelection(value)}
      className={`${
        selected ? "bg-green-950" : "hover:bg-green-950"
      } group   duration-300 ease-in-out w-full text-left transition-all p-2`}
    >
      <h1
        className={`${
          selected
            ? "text-gray-100"
            : "group-hover:text-gray-100 capitalize text-green-900"
        } duration-300 ease-in-out transition-all  text-main`}
      >
        {label}
      </h1>
    </button>
  );
}

export default Selectors;
