import { motion, AnimatePresence } from "framer-motion";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  animated?: boolean;
  hasBackdrop?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4",
  innerClassName = "bg-gray-50 p-6 rounded-lg w-full max-w-sm relative shadow-lg",
  animated = true,
  hasBackdrop = true,
}: ModalProps) {
  useBodyScrollLock(isOpen);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (hasBackdrop && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!animated) {
    if (!isOpen) return null;
    return (
      <div className={className} onClick={handleBackdropClick}>
        <div className={innerClassName} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={innerClassName}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
