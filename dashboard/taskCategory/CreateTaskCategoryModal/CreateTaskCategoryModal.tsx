"use client";

import {
  CreateTaskCategoryForm,
  CreateTaskCategoryFormSubmitButton,
} from "../CreateTaskCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function CreateTaskCategoryModal() {
  const t = useTranslations("dashboard.taskCategories.CreateTaskCategoryModal");

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
