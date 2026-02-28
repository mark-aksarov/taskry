"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteCustomers } from "../DeleteCustomersContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCustomersModalProps extends ModalProps {
  customerIds: number[];
  deleteCustomers: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function DeleteCustomersModal({
  customerIds,
  isOpen,
  onOpenChange,
  deleteCustomers,
}: DeleteCustomersModalProps) {
  const t = useTranslations("customers.DeleteCustomersModal");

  const { startTransition, setCustomerIds: setDeleteCustomerIds } =
    useDeleteCustomers();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteCustomers,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected customers
    setDeleteCustomerIds(customerIds);

    const payload = {
      ids: customerIds,
      shouldRedirect: false,
    };

    startTransition(() => action(payload));
  }

  return (
    <ConfirmModal
      data-test="delete-customers-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: customerIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-customers-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
