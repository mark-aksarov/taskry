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
import { startTransition, useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const initialState: ActionState = {
  status: null,
};

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

  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [_, action, isPending] = useActionState(
    async (prevState: ActionState, payload: string) => {
      // call server action to perform delete action
      const newState = await deleteUser(prevState, payload);

      // close error toast
      closeErrorToast();

      // close modal
      if (newState.status === "success") {
        onOpenChange?.(false);
      }
      // show error toast
      else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

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
