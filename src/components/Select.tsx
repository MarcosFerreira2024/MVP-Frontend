import useSelect from "../hooks/useSelect";
import SelectorsList from "./SelectorsList";
import Button from "./Button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
function Select({
  data,
  initialValue,
  containerIcon,
  queryKey,
}: {
  data: {
    value: string;
    label: string;
  }[];
  initialValue: string;
  queryKey: string;
  containerIcon: string;
}) {
  const { handleSelection, selectedValue, toggleModal, isModalOpen } =
    useSelect(initialValue, queryKey);

  const selectedLabel =
    data.find((item) => item.value === selectedValue)?.label ?? initialValue;

  return (
    <div className="flex flex-col relative">
      <Button
        style={{ minWidth: 120 }}
        justify="between"
        size="sm"
        icon={containerIcon}
        onClick={() => toggleModal()}
      >
        {selectedLabel}
      </Button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute z-10 font-segoe font-semibold top-10  rounded-md bg-gray-100 border border-green-900 left-0 w-[120px]"
          >
            <SelectorsList
              data={data}
              selectedValue={selectedValue}
              handleSelection={handleSelection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Select;
