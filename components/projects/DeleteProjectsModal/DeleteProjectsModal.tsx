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
import { useDeleteProjects } from "../DeleteProjectsContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { overlayTransitionDuration } from "@/components/ui/styles";

interface DeleteProjectsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectsModal({
  isOpen,
  onOpenChange,
}: DeleteProjectsModalProps) {
  const t = useTranslations("projects.DeleteProjectsModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedProjects();
  const { action, setIds: setDeleteCustomerIds } = useDeleteProjects();

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
      data-test="delete-projects-modal"
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
          data-test="delete-projects-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
