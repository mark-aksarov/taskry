"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateTaskDeadlineForm } from "../UpdateTaskDeadlineForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskDeadlineModalProps {
  taskId: number;
  taskDeadline: string;
}

export function UpdateTaskDeadlineModal({
  taskId,
  taskDeadline,
}: UpdateTaskDeadlineModalProps) {
  const t = useTranslations("tasks.UpdateTaskDeadlineModal");

  const { isOpen, onOpenChange } = useModal("updateTaskDeadline");

  return (
    <FormBaseModal
      data-test="update-task-deadline-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateTaskDeadlineForm taskId={taskId} deadline={taskDeadline} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
