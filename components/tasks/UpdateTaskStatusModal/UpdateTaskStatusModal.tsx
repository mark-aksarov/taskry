"use client";

import {
  UpdateTaskStatusForm,
  UpdateTaskStatusFormSubmitButton,
} from "../UpdateTaskStatusForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskStatusModalProps {
  taskId: number;
  taskStatus: TaskStatus;
}

export function UpdateTaskStatusModal({
  taskId,
  taskStatus,
}: UpdateTaskStatusModalProps) {
  const t = useTranslations("tasks.UpdateTaskStatusModal");

  const { isOpen, onOpenChange } = useModal("updateTaskStatus");

  return (
    <FormBaseModal
      data-test="update-task-status-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateTaskStatusForm taskId={taskId} status={taskStatus} />
        </DialogBody>
        <DialogFooter>
          <UpdateTaskStatusFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
