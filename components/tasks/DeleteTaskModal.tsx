"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface DeleteTaskModalProps extends ModalProps {
  taskId: number;
  taskTitle: string;
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
  onSuccess?: () => void;
}

export function DeleteTaskModal({
  taskId,
  taskTitle,
  isOpen,
  onOpenChange,
  deleteAction,
  onSuccess,
}: DeleteTaskModalProps) {
  const t = useTranslations("tasks.DeleteTaskModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state.status, onSuccess]);

  const handleDelete = () => {
    startTransition(() => action([taskId]));
    onOpenChange?.(false);
  };

  useActionErrorToast(state);

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
