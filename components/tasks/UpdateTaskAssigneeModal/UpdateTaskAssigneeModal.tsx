"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateTaskAssigneeFormSubmitButton } from "../UpdateTaskAssigneeForm";
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
        <DialogBody>{updateTaskAssigneeFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskAssigneeFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
