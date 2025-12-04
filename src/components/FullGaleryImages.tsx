import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileCarousel from "./MobileCarousel";
import { X } from "lucide-react";

interface FullGaleryImagesProps {
  isOpen: boolean;
  images: string[];
  handleBackdropClick: () => void;
  close: () => void;
  onDragStateChange: (isDragging: boolean) => void;
}

export function FullGaleryImages({
  isOpen,
  images,
  onDragStateChange,
  handleBackdropClick,
}: FullGaleryImagesProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-sm z-999999 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className="max-w-7xl relative w-full h-[90vh] max-h-[90vh]"
          >
            <MobileCarousel
              images={images}
              onDragStateChange={onDragStateChange}
            />
            <button
              onClick={handleBackdropClick}
              className="absolute border border-green-900 main-shadow bg-gray-50 w-8 h-8 hover:rotate-24 duration-300 ease-in-out rounded-full flex items-center justify-center top-2 right-2"
            >
              <X className="w-5 h-5   text-green-900" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
