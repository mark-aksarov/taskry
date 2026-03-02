"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewProjectCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
