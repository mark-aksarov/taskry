"use client";

import {
  CreateSubtaskForm,
  CreateSubtaskFormSubmitButton,
} from "../CreateSubtaskForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { FormBaseModal, FormBaseModalDialog } from "../../common/FormBaseModal";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateSubtaskModalProps {
  taskId: number;
}

export function CreateSubtaskModal({ taskId }: UpdateSubtaskModalProps) {
  const t = useTranslations("subtasks.CreateSubtaskModal");

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
