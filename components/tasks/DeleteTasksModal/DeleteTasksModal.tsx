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
import { startTransition, useActionState } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteTasksModalProps extends ModalProps {
  taskIds: number[];
  deleteTasks: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function DeleteTasksModal({
  taskIds,
  isOpen,
  onOpenChange,
  deleteTasks,
}: DeleteTasksModalProps) {
  const t = useTranslations("tasks.DeleteTasksModal");

  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [_, action, isPending] = useActionState(
    async (prevState: ActionState, payload: number[]) => {
      const newState = await deleteTasks(prevState, payload);

      closeErrorToast();

      if (newState.status === "success") {
        onOpenChange?.(false);
      } else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

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
