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
import { useDeleteCommentTransition } from "../DeleteCommentTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteCommentModalProps {
  commentId: number;
  deleteComment: ActionFn<ActionState, number>;
  mutate: () => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteCommentModal({
  commentId,
  deleteComment,
  mutate,
  isOpen,
  onOpenChange,
}: DeleteCommentModalProps) {
  const t = useTranslations("comments.DeleteCommentModal");

  const { startTransition } = useDeleteCommentTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteComment,
    onSuccess: mutate,
    successMessage: t("successMessage"),
  });

  function handleDelete() {
    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action(commentId));
  }

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
          data-test="delete-comment-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
