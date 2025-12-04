import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "../hooks/useLoading";

function Loading() {
  const { isLoading } = useLoading();

  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      if (ref.current) {
        ref.current.style.position = "fixed";
      }

      startTimeRef.current = Date.now();
      setVisible(true);
    } else {
      const elapsed = Date.now() - (startTimeRef.current ?? 0);

      const MIN_TIME = 2000;
      const remaining = Math.max(0, MIN_TIME - elapsed);

      const timer = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        if (ref.current) {
          ref.current.style.display = "none";
        }
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ pointerEvents: visible ? "auto" : "none" }} // Added conditional pointerEvents
          className="flex items-center w-screen fixed z-9999999 top-0 left-0 h-screen justify-center gap-1 bg-gray-100"
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-50 p-5 rounded-md shadow-main flex items-center gap-1.5 border border-gray-200 select-none"
          >
            <h1 className="font-serif text-green-800 text-3xl">Carregando</h1>

            {[0, 0.1, 0.2].map((d, i) => (
              <motion.div
                key={i}
                initial={{ y: "50%" }}
                animate={{ y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  delay: d,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-green-700 border-green-800 border rounded-full main-shadow"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loading;
