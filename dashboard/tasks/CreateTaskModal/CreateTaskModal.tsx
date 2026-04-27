"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { CreateTaskFormSubmitButton } from "../CreateTaskForm";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface CreateTaskModalProps {
  createTaskFormContainer: React.ReactNode;
}

export function CreateTaskModal({
  createTaskFormContainer,
}: CreateTaskModalProps) {
  const t = useTranslations("dashboard.tasks.CreateTaskModal");

  const { isOpen, onOpenChange } = useModal("createTask");

  return (
    <FormBaseModal
      data-test="create-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{createTaskFormContainer}</DialogBody>
        <DialogFooter>
          <CreateTaskFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
