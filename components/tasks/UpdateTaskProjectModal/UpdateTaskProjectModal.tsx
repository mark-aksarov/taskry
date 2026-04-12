"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateTaskProjectFormSubmitButton } from "../UpdateTaskProjectForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskProjectModalProps {
  updateTaskProjectFormContainer: React.ReactNode;
}

export function UpdateTaskProjectModal({
  updateTaskProjectFormContainer,
}: UpdateTaskProjectModalProps) {
  const t = useTranslations("tasks.UpdateTaskProjectModal");

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
