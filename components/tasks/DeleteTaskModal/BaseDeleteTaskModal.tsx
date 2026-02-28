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

interface BaseDeleteTaskModalProps extends ModalProps {
  taskTitle: string;
  onDelete: () => void;
}

export function BaseDeleteTaskModal({
  taskTitle,
  isOpen,
  onOpenChange,
  onDelete,
}: BaseDeleteTaskModalProps) {
  const t = useTranslations("tasks.DeleteTaskModal");

  return (
    <ConfirmModal
      data-test="delete-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: taskTitle,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={onDelete}
          data-test="delete-task-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
