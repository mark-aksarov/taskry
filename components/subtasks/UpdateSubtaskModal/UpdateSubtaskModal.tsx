"use client";

import {
  UpdateSubtaskForm,
  UpdateSubtaskFormSubmitButton,
} from "../UpdateSubtaskForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateSubtaskModalProps {
  subtaskId: number;
  taskId: number;
  subtaskText?: string;
}

export function UpdateSubtaskModal({
  subtaskId,
  taskId,
  subtaskText,
}: UpdateSubtaskModalProps) {
  const t = useTranslations("subtasks.UpdateSubtaskModal");

  const { isOpen, onOpenChange } = useModal("updateSubtask");

  return (
    <FormBaseModal
      data-test="update-subtask-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateSubtaskForm
            taskId={taskId}
            subtaskId={subtaskId}
            textDefaultValue={subtaskText}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateSubtaskFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
