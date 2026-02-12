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

interface DeletePositionsModalProps extends ModalProps {
  positionIds: number[];
  deletePositions: ActionFn<ActionState, number[]>;
  onSuccess?: () => void;
}

export function DeletePositionsModal({
  positionIds,
  isOpen,
  onOpenChange,
  deletePositions,
  onSuccess,
}: DeletePositionsModalProps) {
  const t = useTranslations("positions.DeletePositionsModal");
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
    startTransition(() => action(positionIds));
  };

  return (
    <ConfirmModal
      data-test="delete-positions-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: positionIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-positions-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
