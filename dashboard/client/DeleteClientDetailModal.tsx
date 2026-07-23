"use client";

import { startTransition } from "react";
import { useDeleteClient } from "./DeleteClientContext";
import { BaseDeleteClientModal } from "./BaseDeleteClientModal";
import { useModal } from "@/common/ModalManagerContext";

interface DeleteClientModalProps {
  clientId: number;
  clientFullName: string;
}

export function DeleteClientDetailModal({
  clientId,
  clientFullName,
}: DeleteClientModalProps) {
  const { action } = useDeleteClient();
  const { isOpen, onOpenChange } = useModal("deleteClient");

  // Close modal and delete client
  // We should redirect to the client list page after deletion
  function handleDelete() {
    onOpenChange(false);
    startTransition(() => action({ id: clientId, shouldRedirect: true }));
  }

  return (
    <BaseDeleteClientModal
      onDelete={handleDelete}
      clientFullName={clientFullName}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
