"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskAssigneeFormContainer: React.ReactNode;
}

export function UpdateTaskAssigneeModal({
  updateTaskAssigneeFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("tasks.UpdateTaskAssigneeModal");

  const { isOpen, onOpenChange } = useModal("updateTaskAssignee");

  return (
    <FormBaseModal
      data-test="update-task-assignee-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateTaskAssigneeFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
