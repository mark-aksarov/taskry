"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CreateTaskModalProps {
  createTaskFormContainer: React.ReactNode;
}

export function CreateTaskModal({
  createTaskFormContainer,
}: CreateTaskModalProps) {
  const t = useTranslations("tasks.CreateTaskModal");

  const { isModalOpen, onModalOpenChange } = useCreateTask();

  return (
    <FormBaseModal
      data-test="new-task-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {createTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
