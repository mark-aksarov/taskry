"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateTask } from "../UpdateTaskContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface EditTaskModalProps {
  editTaskFormContainer: React.ReactNode;
}

export function EditTaskModal({ editTaskFormContainer }: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

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
          {editTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
