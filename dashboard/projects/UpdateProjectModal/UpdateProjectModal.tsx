"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateProjectFormSubmitButton } from "../UpdateProjectForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateProjectModalProps {
  updateProjectFormContainer: React.ReactNode;
}

export function UpdateProjectModal({
  updateProjectFormContainer,
}: UpdateProjectModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectModal");

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
