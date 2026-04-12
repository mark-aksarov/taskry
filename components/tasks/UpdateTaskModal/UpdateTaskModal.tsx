"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateTaskFormSubmitButton } from "../UpdateTaskForm";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskFormContainer: React.ReactNode;
}

export function UpdateTaskModal({
  updateTaskFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("tasks.UpdateTaskModal");

  const { isOpen, onOpenChange } = useModal("updateTask");

  return (
    <FormBaseModal
      data-test="update-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateTaskFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
