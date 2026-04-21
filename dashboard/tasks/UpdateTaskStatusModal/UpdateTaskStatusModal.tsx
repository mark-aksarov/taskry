"use client";

import {
  UpdateTaskStatusForm,
  UpdateTaskStatusFormSubmitButton,
} from "../UpdateTaskStatusForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateTaskStatusModalProps {
  taskId: number;
  taskStatus: TaskStatus;
}

export function UpdateTaskStatusModal({
  taskId,
  taskStatus,
}: UpdateTaskStatusModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskStatusModal");

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
