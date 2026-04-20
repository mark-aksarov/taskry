"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/dashboard/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useDeleteCustomers } from "../DeleteCustomersContext";
import { overlayTransitionDuration } from "@/ui/styles";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";

export function DeleteCustomersModal() {
  const t = useTranslations("dashboard.customers.DeleteCustomersModal");
  const { isOpen, onOpenChange } = useModal("deleteCustomers");
  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedItems();
  const { action, setIds: setDeleteCustomerIds } = useDeleteCustomers();

  function handleDelete() {
    // Close modal
    onOpenChange(false);

    // Highlight currently selected entities before deletion.
    // Note: selectedIds may change if the user updates selection.
    setDeleteCustomerIds(selectedIds);

    // Clear selected items after the modal close animation.
    // This prevents the modal text from jumping due to deleted items.
    setTimeout(() => {
      clearSelectedItems();
    }, overlayTransitionDuration);

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
