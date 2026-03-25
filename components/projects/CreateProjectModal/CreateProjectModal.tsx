"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateProjectModal } from "./CreateProjectModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CreateProjectModalProps {
  createProjectFormContainer: React.ReactNode;
}

export function CreateProjectModal({
  createProjectFormContainer,
}: CreateProjectModalProps) {
  const t = useTranslations("projects.CreateProjectModal");

  const { isOpen, onOpenChange } = useCreateProjectModal();

  return (
    <FormBaseModal
      data-test="create-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
