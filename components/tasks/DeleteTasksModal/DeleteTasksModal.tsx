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

interface DeleteTasksModalProps extends ModalProps {
  taskIds: number[];
  deleteTasks: ActionFn<ActionState, number[]>;
}

export function DeleteTasksModal({
  taskIds,
  isOpen,
  onOpenChange,
  deleteTasks,
}: DeleteTasksModalProps) {
  const t = useTranslations("tasks.DeleteTasksModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteTasks,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(taskIds));
  };

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
          count: taskIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-tasks-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
