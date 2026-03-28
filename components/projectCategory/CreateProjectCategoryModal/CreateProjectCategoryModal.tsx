"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { CreateProjectCategoryForm } from "../CreateProjectCategoryForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateProjectCategoryModal() {
  const t = useTranslations("projectCategories.CreateProjectCategoryModal");

  const { isOpen, onOpenChange } = useModal("createProjectCategory");

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
