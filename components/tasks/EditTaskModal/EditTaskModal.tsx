"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateTask } from "../UpdateTaskContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
