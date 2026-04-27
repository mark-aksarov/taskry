"use client";

import {
  UpdateTaskDescriptionForm,
  UpdateTaskDescriptionFormSubmitButton,
} from "../UpdateTaskDescriptionForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateTaskDescriptionModalProps {
  taskId: number;
  taskDescription?: string;
}

export function UpdateTaskDescriptionModal({
  taskId,
  taskDescription,
}: UpdateTaskDescriptionModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskDescriptionModal");

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
        <DialogBody>
          <UpdateTaskDescriptionForm
            taskId={taskId}
            description={taskDescription}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateTaskDescriptionFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
