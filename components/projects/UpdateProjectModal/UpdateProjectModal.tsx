"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateProjectModal } from "./UpdateProjectModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectModalProps {
  updateProjectFormContainer: React.ReactNode;
}

export function UpdateProjectModal({
  updateProjectFormContainer,
}: UpdateProjectModalProps) {
  const t = useTranslations("projects.UpdateProjectModal");

  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useUpdateProjectModal();

  return (
    <FormBaseModal
      data-test="edit-project-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
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
