"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../../common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateSubtaskForm } from "../CreateSubtaskForm";
import { useCreateSubtaskModal } from "./CreateSubtaskModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateSubtaskModalProps {
  taskId: number;
}

export function CreateSubtaskModal({ taskId }: UpdateSubtaskModalProps) {
  const t = useTranslations("subtasks.CreateSubtaskModal");

  const { isOpen, onOpenChange } = useCreateSubtaskModal();

  return (
    <FormBaseModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <CreateSubtaskForm taskId={taskId} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
