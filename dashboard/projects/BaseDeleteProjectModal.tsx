"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/ui/Modal";
import { DialogHeading } from "@/ui/Dialog";

interface BaseDeleteProjectModalProps extends ModalProps {
  onDelete: () => void;
  projectTitle: string;
}

export function BaseDeleteProjectModal({
  onDelete,
  projectTitle,
  isOpen,
  onOpenChange,
}: BaseDeleteProjectModalProps) {
  const t = useTranslations("dashboard.projects.DeleteProjectModal");

  return (
    <ConfirmModal
      data-test="delete-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: projectTitle,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={onDelete}
          data-test="delete-project-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
