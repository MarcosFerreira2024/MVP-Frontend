import { useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeContext from "../../context/CodeContext";
import Input from "../Input";
import Button from "../Button";

export default function CodeVerificationModal() {
  const {
    isVisible,
    closeModal,
    onChange,
    onSubmit,
    codeValue,
    emailValue,
    isLoading,
  } = useContext(CodeContext);

  const codeInputRef = useRef<HTMLInputElement>(null);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
        >
          <motion.div
            className="bg-gray-50 p-6 rounded-lg w-full max-w-sm relative shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeModal}
              aria-label="Fechar"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-green-900">
              Verificar Código
            </h2>
            <p className="text-gray-700 mb-4">
              Um código de verificação foi enviado para{" "}
              <span className="font-semibold">{emailValue}</span>. Por favor,
              insira-o abaixo.
            </p>

            <form
              autoComplete="off"
              onSubmit={onSubmit}
              className="flex flex-col gap-4"
            >
              <Input
                readOnly
                value={emailValue}
                type="email"
                id="email"
                name="email"
              />
              <Input
                ref={codeInputRef}
                onChange={onChange}
                value={codeValue}
                type="text"
                id="code"
                name="code"
                placeholder="Ex: 123456"
                required
              />
              <Button disabled={isLoading} variant="default" type="submit">
                {isLoading ? "Verificando..." : "Verificar"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
