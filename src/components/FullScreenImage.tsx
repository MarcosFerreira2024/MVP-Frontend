import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function FullScreenImage({
  image,
  close,
}: {
  image?: string;
  close: () => void;
}) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-99999  flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-zoom-out"
            aria-label="Fechar imagem"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative max-w-7xl max-h-[80vh] mx-4"
          >
            <img
              src={image || "/placeholder.svg"}
              alt="Imagem em tela cheia"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={close}
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
