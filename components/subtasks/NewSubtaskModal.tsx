"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { NewSubtaskForm } from "./NewSubtaskForm";
import { useCreateSubtask } from "./CreateSubtaskContext";

interface EditSubtaskModalProps {
  taskId: number;
}

export function NewSubtaskModal({ taskId }: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.NewSubtaskModal");

  const { isModalOpen, onModalOpenChange } = useCreateSubtask();

  return (
    <FormBaseModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewSubtaskForm taskId={taskId} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
