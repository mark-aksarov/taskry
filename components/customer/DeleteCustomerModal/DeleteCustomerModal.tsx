"use client";

import { startTransition } from "react";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { BaseDeleteCustomerModal } from "./BaseDeleteCustomerModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCustomerModalProps {
  customerId: number;
  customerFullName: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteCustomerModal({
  customerId,
  customerFullName,
  isOpen,
  onOpenChange,
}: DeleteCustomerModalProps) {
  const { action } = useDeleteCustomer();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    const payload = {
      id: customerId,
      shouldRedirect: false,
    };

    //Remove the entity from the selection to prevent access to it
    removeSelected(customerId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(payload));
  }

  return (
    <BaseDeleteCustomerModal
      onDelete={handleDelete}
      customerFullName={customerFullName}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
