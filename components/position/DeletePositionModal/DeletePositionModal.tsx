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
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeletePositionTransition } from "../DeletePositionTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeletePositionModalProps extends ModalProps {
  positionId: number;
  positionName: string;
  deletePosition: ActionFn<ActionState, number[]>;
}

export function DeletePositionModal({
  positionId,
  positionName,
  isOpen,
  onOpenChange,
  deletePosition,
}: DeletePositionModalProps) {
  const t = useTranslations("positions.DeletePositionModal");

  const { startTransition } = useDeletePositionTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deletePosition,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the position from the selection to prevent access to it
    removeSelected(positionId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action([positionId]));
  }

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-position-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
