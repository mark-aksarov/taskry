"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateTaskProjectFormSubmitButton } from "../UpdateTaskProjectForm";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateTaskProjectModalProps {
  updateTaskProjectFormContainer: React.ReactNode;
}

export function UpdateTaskProjectModal({
  updateTaskProjectFormContainer,
}: UpdateTaskProjectModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskProjectModal");

  const { isOpen, onOpenChange } = useModal("updateTaskProject");

  return (
    <FormBaseModal
      data-test="update-task-project-modal"
      isOpen={isOpen}
      className="md:w-[350px]"
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateTaskProjectFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskProjectFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
