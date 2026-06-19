import { useState } from "react";

export function useCarouselNavigation(initialIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleClick = (index: number, onActiveClick?: (index: number) => void) => {
    if (activeIndex === index) {
      onActiveClick?.(index);
    } else {
      setActiveIndex(index);
    }
  };

  return { activeIndex, setActiveIndex, handleClick };
}
