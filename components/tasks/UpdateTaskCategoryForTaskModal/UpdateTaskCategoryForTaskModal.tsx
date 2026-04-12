"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { UpdateTaskCategoryForTaskFormSubmitButton } from "../UpdateTaskCategoryForTaskForm";

interface UpdateTaskCategoryForTaskModalProps {
  updateTaskCategoryForTaskFormContainer: React.ReactNode;
}

export function UpdateTaskCategoryForTaskModal({
  updateTaskCategoryForTaskFormContainer,
}: UpdateTaskCategoryForTaskModalProps) {
  const t = useTranslations("tasks.UpdateTaskCategoryForTaskModal");

  const { isOpen, onOpenChange } = useModal("updateTaskCategoryForTask");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      data-test="update-task-category-for-task-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateTaskCategoryForTaskFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskCategoryForTaskFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
