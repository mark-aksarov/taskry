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

interface DeleteTaskModalProps extends ModalProps {
  taskId: number;
  taskTitle: string;
  deleteTask: ActionFn<ActionState, number[]>;
}

export function DeleteTaskModal({
  taskId,
  taskTitle,
  isOpen,
  onOpenChange,
  deleteTask,
}: DeleteTaskModalProps) {
  const t = useTranslations("tasks.DeleteTaskModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteTask,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([taskId]));
  };

  return (
    <ConfirmModal
      data-test="delete-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: taskTitle,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
