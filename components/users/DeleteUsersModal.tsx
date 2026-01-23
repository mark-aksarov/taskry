"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading, ModalProps } from "@/components/ui";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { ActionFn, ActionState, DeleteUsersPayload } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface DeleteUsersModalProps extends ModalProps {
  userIds: string[];
  deleteAction: ActionFn<ActionState, DeleteUsersPayload>;
  onSuccess?: () => void;
}

export function DeleteUsersModal({
  userIds,
  isOpen,
  onOpenChange,
  deleteAction,
  onSuccess,
}: DeleteUsersModalProps) {
  const t = useTranslations("projects.DeleteUsersModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state.status, onSuccess]);

  const handleDelete = () => {
    startTransition(() => action(userIds));
    onOpenChange?.(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal
      data-test="delete-users-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: userIds.length,
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
