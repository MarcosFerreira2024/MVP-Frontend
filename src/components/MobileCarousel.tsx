"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MobileCarousel({
  images,
  onDragStateChange,
}: {
  images: string[];
  onDragStateChange?: (isDragging: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const constraintsRef = useRef(null);

  const handleDragStart = () => {
    onDragStateChange?.(true);
  };

  const [isHovering, setHover] = useState(false);

  const handleDragEnd = (dragInfo: PanInfo) => {
    onDragStateChange?.(false);

    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      console.log("swipe detection: ", "prev");
      if (index > 0) setIndex(index - 1);
      return;
    } else if (draggedDistance < -swipeThreshold) {
      console.log("swipe detection: ", "next");
      if (index + 1 < images.length) setIndex(index + 1);
      return;
    }
  };

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        ref={constraintsRef}
        className="relative h-full w-full  overflow-hidden"
      >
        <motion.div
          style={{
            width: `${images.length * 100}%`,
            height: `100%`,
          }}
          animate={{
            x: `-${index * (100 / images.length)}%`,
          }}
          drag="x"
          dragElastic={0.3}
          dragConstraints={constraintsRef}
          onDragStart={handleDragStart}
          onDragEnd={(_, dragInfo: PanInfo) => handleDragEnd(dragInfo)}
          className="flex"
        >
          {images.map((image, imageIndex) => (
            <div key={image + imageIndex} className=" w-full h-full ">
              <img
                src={image || "/placeholder.svg"}
                className="min-h-full min-w-full object-cover pointer-events-none "
              />
            </div>
          ))}
        </motion.div>
        <AnimatePresence initial={false}>
          {index > 0 && isHovering && (
            <motion.button
              onMouseEnter={() => setHover(true)}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              whileHover={{ opacity: 1 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg"
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeft className="text-green-900" width={16} height={16} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {index + 1 < images.length && isHovering && (
            <motion.button
              onMouseEnter={() => setHover(true)}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              whileHover={{ opacity: 1 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg"
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRight className="text-green-900" width={16} height={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
