"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateProjectCategoryForm } from "../CreateProjectCategoryForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useCreateProjectCategoryModal } from "./CreateProjectCategoryModalContext";

export function CreateProjectCategoryModal() {
  const t = useTranslations("projectCategories.CreateProjectCategoryModal");

  const { isOpen, onOpenChange } = useCreateProjectCategoryModal();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
