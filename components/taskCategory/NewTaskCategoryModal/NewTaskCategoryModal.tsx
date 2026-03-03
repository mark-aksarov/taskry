"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";

export function NewTaskCategoryModal() {
  const t = useTranslations("taskCategories.NewTaskCategoryModal");

  const { isModalOpen, onModalOpenChange } = useCreateTaskCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewTaskCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
