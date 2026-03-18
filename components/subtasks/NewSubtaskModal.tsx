"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewSubtaskForm } from "./NewSubtaskForm";
import { useCreateSubtask } from "./CreateSubtaskContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewSubtaskForm taskId={taskId} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
