"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { UpdateTaskAssigneeFormSubmitButton } from "../UpdateTaskAssigneeForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateTaskModalProps {
  updateTaskAssigneeFormContainer: React.ReactNode;
}

export function UpdateTaskAssigneeModal({
  updateTaskAssigneeFormContainer,
}: UpdateTaskModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskAssigneeModal");

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
        <DialogBody>{updateTaskAssigneeFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskAssigneeFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
