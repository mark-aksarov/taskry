"use client";

import { startTransition } from "react";
import { useDeleteCustomer } from "./DeleteCustomerContext";
import { BaseDeleteCustomerModal } from "./BaseDeleteCustomerModal";
import { useModal } from "@/components/common/ModalManagerContext";

interface DeleteCustomerModalProps {
  customerId: number;
  customerFullName: string;
}

export function DeleteCustomerDetailModal({
  customerId,
  customerFullName,
}: DeleteCustomerModalProps) {
  const { action } = useDeleteCustomer();
  const { isOpen, onOpenChange } = useModal("deleteCustomer");

  // Close modal and delete customer
  // We should redirect to the customer list page after deletion
  function handleDelete() {
    onOpenChange(false);
    startTransition(() => action({ id: customerId, shouldRedirect: true }));
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
