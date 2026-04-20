"use client";

import { useCallback } from "react";
import { useModalManager } from "./ModalManagerContext";

export function useModal(id: string) {
  const { openModalIds, openModal, closeModal } = useModalManager();

  const isOpen = openModalIds.includes(id);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        openModal(id);
      } else {
        closeModal(id);
      }
    },
    [id, openModal, closeModal],
  );

  return { isOpen, onOpenChange };
}
