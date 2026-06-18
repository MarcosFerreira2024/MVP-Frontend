import { motion, AnimatePresence } from "framer-motion";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
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
            <h2 className="text-xl font-semibold mb-2 text-green-900">
              {title}
            </h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={onCancel}
                disabled={loading}
              >
                {cancelLabel}
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-700 text-white hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Excluindo..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDialog;
