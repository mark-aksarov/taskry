"use client";

import {
  CreateTaskCategoryForm,
  CreateTaskCategoryFormSubmitButton,
} from "../CreateTaskCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateTaskCategoryModal() {
  const t = useTranslations("taskCategories.CreateTaskCategoryModal");

  const { isOpen, onOpenChange } = useModal("createTaskCategory");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <CreateTaskCategoryForm />
        </DialogBody>
        <DialogFooter>
          <CreateTaskCategoryFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
