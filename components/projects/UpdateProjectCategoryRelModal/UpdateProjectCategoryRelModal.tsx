"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { UpdateProjectCategoryRelFormSubmitButton } from "../UpdateProjectCategoryRelForm";

interface UpdateProjectCategoryRelModalProps {
  updateProjectCategoryRelFormContainer: React.ReactNode;
}

export function UpdateProjectCategoryRelModal({
  updateProjectCategoryRelFormContainer,
}: UpdateProjectCategoryRelModalProps) {
  const t = useTranslations("projects.UpdateProjectCategoryRelModal");

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
