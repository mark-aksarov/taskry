"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteSubtaskModalProps {
  subtaskId: number;
  subtaskText: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<ActionState, number>;
  mutate?: () => void;
}

export function DeleteSubtaskModal({
  subtaskId,
  subtaskText,
  isOpen,
  onOpenChange,
  deleteAction,
  mutate,
}: DeleteSubtaskModalProps) {
  const t = useTranslations("subtasks.DeleteSubtaskModal");

  const [state, action] = useActionState(deleteAction, initialState);

  const handleDelete = () => {
    startTransition(() => action(subtaskId));
    onOpenChange(false);
  };

  useEffect(() => {
    if (state.status === "success") {
      mutate?.();
    }
  }, [state, mutate]);

  useActionErrorToast(state);

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
