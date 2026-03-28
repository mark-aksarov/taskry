"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectModalProps {
  updateProjectFormContainer: React.ReactNode;
}

export function UpdateProjectModal({
  updateProjectFormContainer,
}: UpdateProjectModalProps) {
  const t = useTranslations("projects.UpdateProjectModal");

  const { isOpen, onOpenChange } = useModal("updateProject");

  return (
    <FormBaseModal
      data-test="update-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
