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
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteSubtaskContext } from "../DeleteSubtaskContext";

interface DeleteSubtaskModalProps extends ModalProps {
  subtaskId: number;
  subtaskText: string;
}

export function DeleteSubtaskModal({
  subtaskId,
  subtaskText,
  isOpen,
  onOpenChange,
}: DeleteSubtaskModalProps) {
  const t = useTranslations("subtasks.DeleteSubtaskModal");

  const { action } = useDeleteSubtaskContext();

  function handleDelete() {
    onOpenChange?.(false);
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
