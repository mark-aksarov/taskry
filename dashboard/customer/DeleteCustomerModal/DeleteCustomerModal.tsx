"use client";

import { startTransition } from "react";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useModal } from "@/common/ModalManagerContext";
import { BaseDeleteCustomerModal } from "../BaseDeleteCustomerModal";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface DeleteCustomerModalProps {
  customerId: number;
  customerFullName: string;
}

export function DeleteCustomerModal({
  customerId,
  customerFullName,
}: DeleteCustomerModalProps) {
  const { action } = useDeleteCustomer();
  const { isOpen, onOpenChange } = useModal("deleteCustomer");
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
