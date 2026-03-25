"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateProject } from "../UpdateProjectContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectModalProps {
  editProjectFormContainer: React.ReactNode;
}

export function UpdateProjectModal({
  editProjectFormContainer,
}: UpdateProjectModalProps) {
  const t = useTranslations("projects.UpdateProjectModal");

  const { isModalOpen, onModalOpenChange } = useUpdateProject();

  return (
    <FormBaseModal
      data-test="edit-project-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {editProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
