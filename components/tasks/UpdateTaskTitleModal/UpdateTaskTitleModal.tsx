"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateTaskTitleForm } from "../UpdateTaskTitleForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskTitleModalProps {
  taskId: number;
  taskTitle: string;
}

export function UpdateTaskTitleModal({
  taskId,
  taskTitle,
}: UpdateTaskTitleModalProps) {
  const t = useTranslations("tasks.UpdateTaskTitleModal");

  const { isOpen, onOpenChange } = useModal("updateTaskTitle");

  return (
    <FormBaseModal
      data-test="update-task-title-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateTaskTitleForm taskId={taskId} title={taskTitle} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
