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
import { useDeleteTasks } from "../DeleteTasksContext";
import { useSelectedTasks } from "../SelectedTasksContext";

interface DeleteTasksModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTasksModal({
  isOpen,
  onOpenChange,
}: DeleteTasksModalProps) {
  const t = useTranslations("tasks.DeleteTasksModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedTasks();
  const { action, setIds: setDeleteTaskIds } = useDeleteTasks();

  function handleDelete() {
    // Close modal
    onOpenChange(false);

    // Highlight currently selected entities before deletion.
    // Note: selectedIds may change if the user updates selection.
    setDeleteTaskIds(selectedIds);

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
      data-test="delete-tasks-modal"
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
          data-test="delete-tasks-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
