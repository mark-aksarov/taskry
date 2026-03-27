"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateProjectCategoryForm } from "../UpdateProjectCategoryForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useUpdateProjectCategoryModal } from "./UpdateProjectCategoryModalContext";

interface UpdateProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
}

export function UpdateProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
}: UpdateProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.UpdateProjectCategoryModal");

  const { isOpen, onOpenChange } = useUpdateProjectCategoryModal();

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
