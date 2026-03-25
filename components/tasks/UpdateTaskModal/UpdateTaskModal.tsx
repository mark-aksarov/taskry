"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateTask } from "../UpdateTaskContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskFormContainer: React.ReactNode;
}

export function UpdateTaskModal({
  updateTaskFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("tasks.UpdateTaskModal");

  const { isModalOpen, onModalOpenChange } = useUpdateTask();

  return (
    <FormBaseModal
      data-test="edit-task-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
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
