import { useState } from "react";

export function useConfirmDelete() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const requestDelete = (id: string) => setConfirmDeleteId(id);
  const cancelDelete = () => setConfirmDeleteId(null);

  return {
    confirmDeleteId,
    requestDelete,
    cancelDelete,
  };
}
