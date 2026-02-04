"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteTasksModalProps extends ModalProps {
  taskIds: number[];
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  onSuccess?: () => void;
}

export function DeleteTasksModal({
  taskIds,
  isOpen,
  onOpenChange,
  deleteAction,
  onSuccess,
}: DeleteTasksModalProps) {
  const t = useTranslations("tasks.DeleteTasksModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state.status, onSuccess]);

  const handleDelete = () => {
    startTransition(() => action(taskIds));
    onOpenChange?.(false);
  };

  useActionErrorToast(state, t("error.deleteError"));

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-tasks-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
