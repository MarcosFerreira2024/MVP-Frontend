import React from "react";

function Category({
  label,
  selected,
  handleSelection,
}: {
  handleSelection: (value: string) => void;
  label: string;
  selected: boolean;
}) {
  return (
    <li
      onClick={() => handleSelection(label)}
      className={`${selected && "underline-offset-4 underline "} text-gray-50`}
    >
      {label}
    </li>
  );
}

export default Category;
