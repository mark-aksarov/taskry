"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateProject } from "../CreateProjectContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CreateProjectModalProps {
  createProjectFormContainer: React.ReactNode;
}

export function CreateProjectModal({
  createProjectFormContainer,
}: CreateProjectModalProps) {
  const t = useTranslations("projects.CreateProjectModal");

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
          {createProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
