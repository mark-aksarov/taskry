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
import { useDeleteSubtask } from "../DeleteSubtaskContext";
import { useModal } from "@/components/common/ModalManagerContext";

interface DeleteSubtaskModalProps {
  subtaskId: number;
  subtaskText: string;
}

export function DeleteSubtaskModal({
  subtaskId,
  subtaskText,
}: DeleteSubtaskModalProps) {
  const t = useTranslations("subtasks.DeleteSubtaskModal");
  const { isOpen, onOpenChange } = useModal("deleteSubtask");
  const { action } = useDeleteSubtask();

  function handleDelete() {
    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(subtaskId));
  }

  return (
    <ConfirmModal
      data-test="delete-subtask-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          text: subtaskText,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-subtask-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
