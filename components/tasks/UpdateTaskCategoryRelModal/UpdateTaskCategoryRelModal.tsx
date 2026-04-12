"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { UpdateTaskCategoryRelFormSubmitButton } from "../UpdateTaskCategoryRelForm";

interface UpdateTaskCategoryRelModalProps {
  updateTaskCategoryRelFormContainer: React.ReactNode;
}

export function UpdateTaskCategoryRelModal({
  updateTaskCategoryRelFormContainer,
}: UpdateTaskCategoryRelModalProps) {
  const t = useTranslations("tasks.UpdateTaskCategoryRelModal");

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
