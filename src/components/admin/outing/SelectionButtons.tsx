import Button from "../../Button";
import Label from "../../Label";
import type { DataItem, SetDataItemDispatch } from "./OutingCreationModal";

type SelectionButtonsProps<T extends DataItem> = {
  data: T[];
  selectedItem: T;
  setSelectedItem: SetDataItemDispatch;
  label: string;
};

function SelectionButtons<T extends DataItem>({
  data,
  selectedItem,
  setSelectedItem,
  label,
}: SelectionButtonsProps<T>) {
  return (
    <Label to={label.toLowerCase()} text={label} className="text-main text-xl">
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => {
          const isSelected = selectedItem.name === item.name;
          return (
            <Button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              size="sm"
              className="md:text-nowrap text-wrap"
              variant={isSelected ? "contrast" : "opacity"}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </Label>
  );
}

export { SelectionButtons };
