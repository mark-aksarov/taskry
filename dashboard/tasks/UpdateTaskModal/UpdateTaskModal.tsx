"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { UpdateTaskFormSubmitButton } from "../UpdateTaskForm";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskFormContainer: React.ReactNode;
}

export function UpdateTaskModal({
  updateTaskFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskModal");

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
