"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useDeleteComment } from "../DeleteCommentContext";
import { useCommentFormContext } from "../CommentFormContext";
import { useModal } from "@/common/ModalManagerContext";

interface DeleteCommentModalProps {
  commentId: number;
}

export function DeleteCommentModal({ commentId }: DeleteCommentModalProps) {
  const t = useTranslations("dashboard.comments.DeleteCommentModal");
  const { isOpen, onOpenChange } = useModal("deleteComment");
  const { editCommentId, setEditCommentId, setCommentContent } =
    useCommentFormContext();
  const { action } = useDeleteComment();

  function handleDelete() {
    // clear editCommentId if deleting comment that is currently being edited
    if (editCommentId === commentId) {
      setEditCommentId(undefined);
      setCommentContent("");
    }

    //close modal before deleting
    onOpenChange(false);
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
