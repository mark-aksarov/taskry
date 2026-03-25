"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateTaskCategoryForm } from "../CreateTaskCategoryForm";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateTaskCategoryModal() {
  const t = useTranslations("taskCategories.CreateTaskCategoryModal");

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
          <CreateTaskCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
