"use client";

import {
  CreateProjectCategoryForm,
  CreateProjectCategoryFormSubmitButton,
} from "../CreateProjectCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

export function CreateProjectCategoryModal() {
  const t = useTranslations(
    "dashboard.projectCategories.CreateProjectCategoryModal",
  );

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
