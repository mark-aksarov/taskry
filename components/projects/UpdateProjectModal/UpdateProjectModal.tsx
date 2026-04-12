"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateProjectFormSubmitButton } from "../UpdateProjectForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectModalProps {
  updateProjectFormContainer: React.ReactNode;
}

export function UpdateProjectModal({
  updateProjectFormContainer,
}: UpdateProjectModalProps) {
  const t = useTranslations("projects.UpdateProjectModal");

  const { isOpen, onOpenChange } = useModal("updateProject");

  return (
    <FormBaseModal
      data-test="update-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateProjectFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateProjectFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
