import { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeContext from "../../context/CodeContext";
import Input from "../Input";
import Button from "../Button";

export default function CodeVerificationModal() {
  const { isVisible, closeModal, onChange, onSubmit, value, isLoading } =
    useContext(CodeContext);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
        >
          <motion.div
            className="bg-gray-50 p-4 rounded-lg w-120 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4 text-green-900">
              Digite o código de verificação
            </h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                type="text"
                id="code"
                name="code"
              />
              <Button disabled={isLoading} styles="contrast">
                Verificar
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
