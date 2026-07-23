"use client";

import { startTransition } from "react";
import { useDeleteClient } from "../DeleteClientContext";
import { useModal } from "@/common/ModalManagerContext";
import { BaseDeleteClientModal } from "../BaseDeleteClientModal";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface DeleteClientModalProps {
  clientId: number;
  clientFullName: string;
}

export function DeleteClientModal({
  clientId,
  clientFullName,
}: DeleteClientModalProps) {
  const { action } = useDeleteClient();
  const { isOpen, onOpenChange } = useModal("deleteClient");
  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    const payload = {
      id: clientId,
      shouldRedirect: false,
    };

    //Remove the entity from the selection to prevent access to it
    removeSelected(clientId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(payload));
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
