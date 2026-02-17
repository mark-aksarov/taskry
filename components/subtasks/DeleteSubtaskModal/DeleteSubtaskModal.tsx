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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteSubtaskModalProps extends ModalProps {
  subtaskId: number;
  subtaskText: string;
  deleteSubtask: ActionFn<ActionState, number>;
  mutate?: () => void;
}

export function DeleteSubtaskModal({
  subtaskId,
  subtaskText,
  isOpen,
  onOpenChange,
  deleteSubtask,
  mutate,
}: DeleteSubtaskModalProps) {
  const t = useTranslations("subtasks.DeleteSubtaskModal");

  const [_, action, isPending] = useDeleteModalActionState<number>({
    deleteEntity: deleteSubtask,
    onOpenChange,
    onSuccess: mutate,
  });

  const handleDelete = () => {
    startTransition(() => action(subtaskId));
  };

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
          isPending={isPending}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
