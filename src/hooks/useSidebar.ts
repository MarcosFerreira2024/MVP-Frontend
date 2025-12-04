import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const categories = [
  {
    value: "all",
    label: "Todas",
  },
  {
    value: "Event",
    label: "Eventos",
  },
  {
    value: "Trail",
    label: "Trilhas",
  },
  {
    value: "Park",
    label: "Parques",
  },
];

function useSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "all";

  const handleSelection = useCallback(
    (label: string) => {
      const finded = categories.find((item) => item.label === label);
      const newCategory = finded?.value ?? "all";

      if (newCategory !== currentCategory) {
        setSearchParams((prev) => {
          prev.set("category", newCategory);
          prev.set("page", "1"); // Reset page to 1 on category change
          return prev;
        });
      }
    },
    [currentCategory, setSearchParams]
  );

  return {
    currentCategory,
    handleSelection,
    categories,
  };
}

export default useSidebar;
