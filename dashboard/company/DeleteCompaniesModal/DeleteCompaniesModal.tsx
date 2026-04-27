"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { overlayTransitionDuration } from "@/ui/styles";
import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { useModal } from "@/common/ModalManagerContext";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

export function DeleteCompaniesModal() {
  const t = useTranslations("dashboard.company.DeleteCompaniesModal");
  const { isOpen, onOpenChange } = useModal("deleteCompanies");
  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedItems();
  const { action, setIds: setDeleteCompanyIds } = useDeleteCompanies();

  function handleDelete() {
    // Close modal
    onOpenChange(false);

    // Highlight currently selected entities before deletion.
    // Note: selectedIds may change if the user updates selection.
    setDeleteCompanyIds(selectedIds);

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
      data-test="delete-companies-modal"
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
          data-test="delete-companies-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
