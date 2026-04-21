"use client";

import {
  UpdateTaskCategoryForm,
  UpdateTaskCategoryFormSubmitButton,
} from "../UpdateTaskCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
}

export function UpdateTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
}: UpdateTaskCategoryModalProps) {
  const t = useTranslations("dashboard.taskCategories.UpdateTaskCategoryModal");

  const { isOpen, onOpenChange } = useModal("updateTaskCategory");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateTaskCategoryForm
            taskCategoryId={taskCategoryId}
            nameDefaultValue={taskCategoryName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateTaskCategoryFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
