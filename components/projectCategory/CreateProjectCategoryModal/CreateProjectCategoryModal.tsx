"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateProjectCategoryForm } from "../CreateProjectCategoryForm";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateProjectCategoryModal() {
  const t = useTranslations("projectCategories.CreateProjectCategoryModal");

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
          <CreateProjectCategoryForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
