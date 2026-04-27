"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateProjectCategoryRelFormSubmitButton } from "../UpdateProjectCategoryRelForm";

interface UpdateProjectCategoryRelModalProps {
  updateProjectCategoryRelFormContainer: React.ReactNode;
}

export function UpdateProjectCategoryRelModal({
  updateProjectCategoryRelFormContainer,
}: UpdateProjectCategoryRelModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectCategoryRelModal");

  const { isOpen, onOpenChange } = useModal("updateProjectCategoryRel");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      data-test="update-project-category-rel-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateProjectCategoryRelFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateProjectCategoryRelFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
