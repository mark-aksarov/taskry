"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteCustomers } from "../DeleteCustomersContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCustomersModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCustomersModal({
  isOpen,
  onOpenChange,
}: DeleteCustomersModalProps) {
  const t = useTranslations("customers.DeleteCustomersModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedItems();
  const { action, setIds: setDeleteCustomerIds } = useDeleteCustomers();

  function handleDelete() {
    // Close modal
    onOpenChange(false);

    // Highlight currently selected entities before deletion.
    // Note: selectedIds may change if the user updates selection.
    setDeleteCustomerIds(selectedIds);

    // Clear selected items after the modal close animation (150ms).
    // This prevents the modal text from jumping due to deleted items.
    setTimeout(() => {
      clearSelectedItems();
    }, 150);

    // Trigger the deletion
    startTransition(() => {
      action(selectedIds);
    });
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
          count: selectedIds.length,
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
