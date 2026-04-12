"use client";

import {
  UpdateTaskDescriptionForm,
  UpdateTaskDescriptionFormSubmitButton,
} from "../UpdateTaskDescriptionForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
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
