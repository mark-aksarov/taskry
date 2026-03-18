"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface NewTaskModalProps {
  newTaskFormContainer: React.ReactNode;
}

export function NewTaskModal({ newTaskFormContainer }: NewTaskModalProps) {
  const t = useTranslations("tasks.NewTaskModal");

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
          {newTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
