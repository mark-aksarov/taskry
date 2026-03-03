"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateProject } from "../CreateProjectContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
