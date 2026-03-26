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
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeletePosition } from "../DeletePositionContext";
import { useDeletePositionModal } from "./DeletePositionModalContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeletePositionModalProps {
  positionId: number;
  positionName: string;
}

export function DeletePositionModal({
  positionId,
  positionName,
}: DeletePositionModalProps) {
  const t = useTranslations("positions.DeletePositionModal");
  const { action } = useDeletePosition();
  const { isOpen, onOpenChange } = useDeletePositionModal();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the entity from the selection to prevent access to it
    removeSelected(positionId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(positionId));
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
