"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface DeleteUserModalProps extends ModalProps {
  userId: string;
  userFullName: string;
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
  onSuccess?: () => void;
}

export function DeleteUserModal({
  userId,
  userFullName,
  isOpen,
  onOpenChange,
  deleteAction,
  onSuccess,
}: DeleteUserModalProps) {
  const t = useTranslations("users.DeleteUserModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state.status, onSuccess]);

  const handleDelete = () => {
    startTransition(() => action([userId]));
    onOpenChange?.(false);
  };

  useActionErrorToast(state);

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
