"use client";

import {
  CreateProjectCategoryForm,
  CreateProjectCategoryFormSubmitButton,
} from "../CreateProjectCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
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
        <DialogBody>
          <CreateProjectCategoryForm />
        </DialogBody>
        <DialogFooter>
          <CreateProjectCategoryFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
