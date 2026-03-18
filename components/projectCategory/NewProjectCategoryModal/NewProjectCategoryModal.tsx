"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function NewProjectCategoryModal() {
  const t = useTranslations("projectCategories.NewProjectCategoryModal");

  const { isModalOpen, onModalOpenChange } = useCreateProjectCategory();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewProjectCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
