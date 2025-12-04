import React from "react";
import Selectors from "./Selectors";

function SelectorsList({
  data,
  handleSelection,
  selectedValue,
}: {
  data: {
    value: string;
    label: string;
  }[];
  handleSelection: (value: string) => void;
  selectedValue: string;
}) {
  return (
    <>
      {data.map((item) => {
        const selected = item.value === selectedValue;

        return (
          <Selectors
            key={item.value}
            handleSelection={handleSelection}
            selected={selected}
            value={item.value}
            label={item.label}
          />
        );
      })}
    </>
  );
}

export default SelectorsList;
