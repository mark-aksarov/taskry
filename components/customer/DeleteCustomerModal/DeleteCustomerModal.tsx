"use client";

import { useDeleteCustomer } from "../DeleteCustomerContext";
import { BaseDeleteCustomerModal } from "./BaseDeleteCustomerModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { handleDeleteEntity } from "@/lib/utils/handleDeleteEntity";

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
      ids: [customerId],
      shouldRedirect: false,
    };

    handleDeleteEntity(
      removeSelected,
      action,
      payload,
      customerId,
      onOpenChange,
    );
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
