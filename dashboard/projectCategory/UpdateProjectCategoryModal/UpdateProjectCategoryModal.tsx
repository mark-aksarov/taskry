"use client";

import {
  UpdateProjectCategoryForm,
  UpdateProjectCategoryFormSubmitButton,
} from "../UpdateProjectCategoryForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
}

export function UpdateProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
}: UpdateProjectCategoryModalProps) {
  const t = useTranslations(
    "dashboard.projectCategories.UpdateProjectCategoryModal",
  );

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
