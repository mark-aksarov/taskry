"use client";

import {
  UpdateProjectCategoryForm,
  UpdateProjectCategoryFormSubmitButton,
} from "../UpdateProjectCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
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
        <DialogBody>
          <UpdateProjectCategoryForm
            projectCategoryId={projectCategoryId}
            nameDefaultValue={projectCategoryName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateProjectCategoryFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
