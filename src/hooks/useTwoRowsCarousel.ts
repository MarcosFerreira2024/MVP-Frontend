import { useEffect, useRef, useState } from "react";
import type { OutingCarouselItem } from "../components/outing/TwoRowsCarousel";

function useTwoRowsCarousel(items: OutingCarouselItem[]) {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastFocusScrollRef = useRef<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const midPoint = Math.ceil(items.length / 2);
  const topRowItems = items.slice(0, midPoint);
  const bottomRowItems = items.slice(midPoint);

  const itemsPerRow = midPoint;
  const fakeItemsNeeded = itemsPerRow - bottomRowItems.length;
  const balancedBottomRowItems = [
    ...bottomRowItems,
    ...Array(fakeItemsNeeded).fill(null),
  ];

  const getCardWidth = () => {
    if (!topRowRef.current) return 0;
    const firstCard = topRowRef.current.querySelector(
      ".carousel-item"
    ) as HTMLElement;
    if (!firstCard) return 0;
    const gap = 16;
    return firstCard.offsetWidth + gap;
  };

  const updateScrollButtons = () => {
    if (!topRowRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = topRowRef.current;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const syncScroll = (source: "top" | "bottom") => {
    if (isProgrammaticScrollRef.current) return;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      if (source === "top" && topRowRef.current && bottomRowRef.current) {
        if (
          Math.abs(
            bottomRowRef.current.scrollLeft - topRowRef.current.scrollLeft
          ) > 2
        ) {
          bottomRowRef.current.scrollLeft = topRowRef.current.scrollLeft;
        }
      } else if (
        source === "bottom" &&
        topRowRef.current &&
        bottomRowRef.current
      ) {
        if (
          Math.abs(
            topRowRef.current.scrollLeft - bottomRowRef.current.scrollLeft
          ) > 2
        ) {
          topRowRef.current.scrollLeft = bottomRowRef.current.scrollLeft;
        }
      }

      updateScrollButtons();
    }, 10);
  };

  const handlePrevious = () => {
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    isProgrammaticScrollRef.current = true;

    topRowRef.current?.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });

    bottomRowRef.current?.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      updateScrollButtons();
    }, 400);
  };

  const handleNext = () => {
    const cardWidth = getCardWidth();
    if (!cardWidth) return;

    isProgrammaticScrollRef.current = true;

    topRowRef.current?.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    bottomRowRef.current?.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      updateScrollButtons();
    }, 400);
  };

  useEffect(() => {
    updateScrollButtons();

    const handleResize = () => {
      updateScrollButtons();
    };

    const preventKeyboardScroll = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const target = e.target as HTMLElement;

        if (
          topRowRef.current?.contains(target) ||
          bottomRowRef.current?.contains(target) ||
          target === topRowRef.current ||
          target === bottomRowRef.current
        ) {
          e.preventDefault();
        }
      }
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;

      const isInTopRow = topRowRef.current?.contains(target);
      const isInBottomRow = bottomRowRef.current?.contains(target);

      if (!isInTopRow && !isInBottomRow) return;

      const now = Date.now();
      if (now - lastFocusScrollRef.current < 100) return;
      lastFocusScrollRef.current = now;

      isProgrammaticScrollRef.current = true;

      requestAnimationFrame(() => {
        if (isInTopRow && topRowRef.current && bottomRowRef.current) {
          const targetScrollLeft = topRowRef.current.scrollLeft;
          bottomRowRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
          });
        } else if (isInBottomRow && bottomRowRef.current && topRowRef.current) {
          const targetScrollLeft = bottomRowRef.current.scrollLeft;
          topRowRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
          });
        }

        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          updateScrollButtons();
        }, 400);
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", preventKeyboardScroll);
    window.addEventListener("focusin", handleFocus, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", preventKeyboardScroll);
      window.removeEventListener("focusin", handleFocus, true);
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [items]);
  return {
    handleNext,
    handlePrevious,
    balancedBottomRowItems,
    topRowRef,
    bottomRowRef,

    syncScroll,
    topRowItems,
    canScrollLeft,
    canScrollRight,
  };
}

export default useTwoRowsCarousel;
