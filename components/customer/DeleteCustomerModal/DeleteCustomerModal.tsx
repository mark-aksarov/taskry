"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { BaseDeleteCustomerModal } from "./BaseDeleteCustomerModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteCustomerTransition } from "../DeleteCustomerTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteCustomerModalProps extends ModalProps {
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function DeleteCustomerModal({
  customerId,
  customerFullName,
  isOpen,
  onOpenChange,
  deleteCustomer,
}: DeleteCustomerModalProps) {
  const t = useTranslations("customers.DeleteCustomerModal");

  const { startTransition } = useDeleteCustomerTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteCustomer,
    successMessage: t("successMessage"),
  });

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
