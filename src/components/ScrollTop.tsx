import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollState } from "../hooks/useScrollState";
import Button from "./Button";

export function ScrollTop() {
  const isVisible = useScrollState(200);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-2 right-2 z-50"
        >
          <Button
            className="rounded-full"
            size="icon"
            variant="contrast"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
