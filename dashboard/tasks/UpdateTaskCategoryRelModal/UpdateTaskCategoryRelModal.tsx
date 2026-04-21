"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateTaskCategoryRelFormSubmitButton } from "../UpdateTaskCategoryRelForm";

interface UpdateTaskCategoryRelModalProps {
  updateTaskCategoryRelFormContainer: React.ReactNode;
}

export function UpdateTaskCategoryRelModal({
  updateTaskCategoryRelFormContainer,
}: UpdateTaskCategoryRelModalProps) {
  const t = useTranslations("dashboard.tasks.UpdateTaskCategoryRelModal");

  const { isOpen, onOpenChange } = useModal("updateTaskCategoryRel");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      data-test="update-task-category-rel-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateTaskCategoryRelFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateTaskCategoryRelFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
