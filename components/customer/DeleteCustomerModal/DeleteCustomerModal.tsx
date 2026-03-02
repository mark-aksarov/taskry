"use client";

import { startTransition } from "react";
import { ModalProps } from "@/components/ui/Modal";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { BaseDeleteCustomerModal } from "./BaseDeleteCustomerModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCustomerModalProps extends ModalProps {
  customerId: number;
  customerFullName: string;
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
    //Remove the customer from the selection to prevent access to it
    removeSelected(customerId);

    //close modal before deleting
    onOpenChange?.(false);

    const payload = {
      ids: [customerId],
      shouldRedirect: false,
    };

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
