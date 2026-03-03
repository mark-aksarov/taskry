"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateProject } from "../UpdateProjectContext";

interface EditProjectModalProps {
  editProjectFormContainer: React.ReactNode;
}

export function EditProjectModal({
  editProjectFormContainer,
}: EditProjectModalProps) {
  const t = useTranslations("projects.EditProjectModal");

  const { isModalOpen, onModalOpenChange } = useUpdateProject();

  return (
    <FormBaseModal
      data-test="edit-project-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
