"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteProjectsModalProps extends ModalProps {
  projectIds: number[];
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  onSuccess?: () => void;
}

export function DeleteProjectsModal({
  projectIds,
  isOpen,
  onOpenChange,
  deleteAction,
  onSuccess,
}: DeleteProjectsModalProps) {
  const t = useTranslations("projects.DeleteProjectsModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
    }
  }, [state.status, onSuccess]);

  const handleDelete = () => {
    startTransition(() => action(projectIds));
    onOpenChange?.(false);
  };

  useActionErrorToast(state, t("error.deleteError"));

  return (
    <ConfirmModal
      data-test="delete-projects-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: projectIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-projects-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
