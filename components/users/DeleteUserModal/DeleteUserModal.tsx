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
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFullName: string;
  deleteUser: ActionFn<ActionState, string>;
  onSuccess?: () => void;
}

export function DeleteUserModal({
  userId,
  userFullName,
  isOpen,
  onOpenChange,
  deleteUser,
}: DeleteUserModalProps) {
  const t = useTranslations("users.DeleteUserModal");

  const [_, action, isPending] = useDeleteModalActionState<string>({
    deleteEntity: deleteUser,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(userId));
  };

  return (
    <ConfirmModal
      data-test="delete-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: userFullName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          data-test="delete-user-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
