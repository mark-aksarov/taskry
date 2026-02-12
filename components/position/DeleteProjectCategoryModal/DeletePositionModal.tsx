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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeletePositionModalProps extends ModalProps {
  positionId: number;
  positionName: string;
  deletePositions: ActionFn<ActionState, number[]>;
  onSuccess?: () => void;
}

export function DeletePositionModal({
  positionId,
  positionName,
  isOpen,
  onOpenChange,
  deletePositions,
  onSuccess,
}: DeletePositionModalProps) {
  const t = useTranslations("positions.DeletePositionModal");
  const [state, action, isPending] = useActionState(
    deletePositions,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
      onOpenChange?.(false);
    }
  }, [state.status, onSuccess]);

  useActionErrorToast(state, t("deleteError"));

  const handleDelete = () => {
    startTransition(() => action([positionId]));
  };

  return (
    <ConfirmModal
      data-test="delete-position-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: positionName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-position-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
