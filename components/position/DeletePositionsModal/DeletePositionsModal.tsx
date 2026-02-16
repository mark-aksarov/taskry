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
import { useErrorToast } from "@/lib/hooks/useErrorToast";
import { ActionFn, ActionState } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
};

interface DeletePositionsModalProps extends ModalProps {
  positionIds: number[];
  deletePositions: ActionFn<ActionState, number[]>;
}

export function DeletePositionsModal({
  positionIds,
  isOpen,
  onOpenChange,
  deletePositions,
}: DeletePositionsModalProps) {
  const t = useTranslations("positions.DeletePositionsModal");

  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: number[]) => {
      const newState = await deletePositions(prevState, payload);

      closeErrorToast();

      if (newState.status === "success") {
        onOpenChange?.(false);
      } else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

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
