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

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deletePositions,
    onOpenChange,
  });

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
