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
import { useDeleteCommentContext } from "../DeleteCommentContext";

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

  const { action } = useDeleteCommentContext();

  function handleDelete() {
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
