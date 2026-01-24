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
  message: null,
};

interface DeleteCommentModalProps {
  commentId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<ActionState, number>;
  mutate: () => void;
}

export function DeleteCommentModal({
  commentId,
  isOpen,
  onOpenChange,
  deleteAction,
  mutate,
}: DeleteCommentModalProps) {
  const t = useTranslations("comments.DeleteCommentModal");
  const [state, action] = useActionState(deleteAction, initialState);

  const handleDelete = () => {
    startTransition(() => action(commentId));
    onOpenChange(false);
  };

  useEffect(() => {
    if (state.status === "success") {
      mutate();
    }
  }, [state, mutate]);

  useActionErrorToast(state);

  return (
    <ConfirmModal
      data-test="delete-comment-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>{t("text")}</ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("confirmButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
