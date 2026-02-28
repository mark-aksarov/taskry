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
  const t = useTranslations("projects.DeleteProjectModal");

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
