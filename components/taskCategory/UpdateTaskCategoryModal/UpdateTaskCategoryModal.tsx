"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateTaskCategoryForm } from "../UpdateTaskCategoryForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
}

export function UpdateTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
}: UpdateTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.UpdateTaskCategoryModal");

  const { isOpen, onOpenChange } = useModal("updateTaskCategory");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateTaskCategoryForm
            taskCategoryId={taskCategoryId}
            nameDefaultValue={taskCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
