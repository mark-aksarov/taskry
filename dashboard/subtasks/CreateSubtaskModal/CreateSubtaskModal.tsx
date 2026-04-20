"use client";

import {
  CreateSubtaskForm,
  CreateSubtaskFormSubmitButton,
} from "../CreateSubtaskForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FormBaseModal, FormBaseModalDialog } from "../../common/FormBaseModal";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateSubtaskModalProps {
  taskId: number;
}

export function CreateSubtaskModal({ taskId }: UpdateSubtaskModalProps) {
  const t = useTranslations("dashboard.subtasks.CreateSubtaskModal");

  const { isOpen, onOpenChange } = useModal("createSubtask");

  return (
    <FormBaseModal
      data-test="create-subtask-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <DialogBody>
          <CreateSubtaskForm taskId={taskId} />
        </DialogBody>
        <DialogFooter>
          <CreateSubtaskFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
