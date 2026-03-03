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
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteComment } from "../DeleteCommentContext";
import { useCommentFormContext } from "../CommentFormContext";

interface DeleteCommentModalProps {
  commentId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteCommentModal({
  commentId,
  isOpen,
  onOpenChange,
}: DeleteCommentModalProps) {
  const t = useTranslations("comments.DeleteCommentModal");

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
