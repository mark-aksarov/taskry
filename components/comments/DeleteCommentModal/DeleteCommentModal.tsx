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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteCommentModalProps {
  commentId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteComment: ActionFn<ActionState, number>;
  mutate: () => void;
}

export function DeleteCommentModal({
  commentId,
  isOpen,
  onOpenChange,
  deleteComment,
  mutate,
}: DeleteCommentModalProps) {
  const t = useTranslations("comments.DeleteCommentModal");

  const [_, action, isPending] = useDeleteModalActionState<number>({
    deleteEntity: deleteComment,
    onOpenChange,
    onSuccess: mutate,
  });

  const handleDelete = () => {
    startTransition(() => action(commentId));
  };

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
          isPending={isPending}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
