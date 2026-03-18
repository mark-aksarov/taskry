"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateProject } from "../CreateProjectContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface NewProjectModalProps {
  newProjectFormContainer: React.ReactNode;
}

export function NewProjectModal({
  newProjectFormContainer,
}: NewProjectModalProps) {
  const t = useTranslations("projects.NewProjectModal");

  const { isModalOpen, onModalOpenChange } = useCreateProject();

  return (
    <FormBaseModal
      data-test="new-project-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {newProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
