"use client";

import {
  UpdateTaskTitleForm,
  UpdateTaskTitleFormSubmitButton,
} from "../UpdateTaskTitleForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateTaskTitleModalProps {
  taskId: number;
  taskTitle: string;
}

export function UpdateTaskTitleModal({
  taskId,
  taskTitle,
}: UpdateTaskTitleModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskTitleModal");

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
        <DialogBody>
          <UpdateTaskTitleForm taskId={taskId} title={taskTitle} />
        </DialogBody>
        <DialogFooter>
          <UpdateTaskTitleFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
