"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateTaskDescriptionForm } from "../UpdateTaskDescriptionForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskDescriptionModalProps {
  taskId: number;
  taskDescription?: string;
}

export function UpdateTaskDescriptionModal({
  taskId,
  taskDescription,
}: UpdateTaskDescriptionModalProps) {
  const t = useTranslations("tasks.UpdateTaskDescriptionModal");

  const { isOpen, onOpenChange } = useModal("updateTaskDescription");

  return (
    <FormBaseModal
      data-test="update-task-description-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[450px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateTaskDescriptionForm
            taskId={taskId}
            description={taskDescription}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
