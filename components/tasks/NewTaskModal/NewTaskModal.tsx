"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateTask } from "../CreateTaskContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
