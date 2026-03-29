"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskFormContainer: React.ReactNode;
}

export function UpdateTaskModal({
  updateTaskFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("tasks.UpdateTaskModal");

  const { isOpen, onOpenChange } = useModal("updateTask");

  return (
    <FormBaseModal
      data-test="edit-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
