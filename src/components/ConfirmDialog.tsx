import { Modal } from "./Modal";

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
    <Modal isOpen={isOpen}>
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
    </Modal>
  );
}

export default ConfirmDialog;
