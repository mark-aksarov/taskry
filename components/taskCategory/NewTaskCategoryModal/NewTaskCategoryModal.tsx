"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewTaskCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
