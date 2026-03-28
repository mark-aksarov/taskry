"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateProjectCategoryForm } from "../UpdateProjectCategoryForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
}

export function UpdateProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
}: UpdateProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.UpdateProjectCategoryModal");

  const { isOpen, onOpenChange } = useModal("updateProjectCategory");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateProjectCategoryForm
            projectCategoryId={projectCategoryId}
            nameDefaultValue={projectCategoryName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
