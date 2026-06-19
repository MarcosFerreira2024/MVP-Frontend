import { useState, useCallback } from "react";
import { deleteOuting } from "../actions/deleteOuting";
import type { OutingResponse } from "../types/Outing";
import toast from "react-hot-toast";

export function useOutingCrud(rawOutings: OutingResponse[]) {
  const [editingOuting, setEditingOuting] = useState<OutingResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingOutingId, setDeletingOutingId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const handleEditOuting = (id: string) => {
    const outing = rawOutings.find((o) => o.id === id);
    if (outing) {
      setEditingOuting(outing);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteOuting = (id: string) => {
    setDeletingOutingId(id);
  };

  const confirmDelete = useCallback(async (onSuccess?: () => void) => {
    if (!deletingOutingId) return;
    setDeletingLoading(true);
    try {
      await deleteOuting(deletingOutingId);
      toast.success("Passeio excluído com sucesso!");
      setDeletingOutingId(null);
      onSuccess?.();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao excluir passeio.");
    } finally {
      setDeletingLoading(false);
    }
  }, [deletingOutingId]);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingOuting(null);
  };

  const cancelDelete = () => {
    setDeletingOutingId(null);
  };

  return {
    editingOuting,
    isEditModalOpen,
    deletingOutingId,
    deletingLoading,
    handleEditOuting,
    handleDeleteOuting,
    confirmDelete,
    closeEditModal,
    cancelDelete,
  };
}
