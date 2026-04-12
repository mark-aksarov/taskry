"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateTaskFormSubmitButton } from "../CreateTaskForm";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CreateTaskModalProps {
  createTaskFormContainer: React.ReactNode;
}

export function CreateTaskModal({
  createTaskFormContainer,
}: CreateTaskModalProps) {
  const t = useTranslations("tasks.CreateTaskModal");

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
