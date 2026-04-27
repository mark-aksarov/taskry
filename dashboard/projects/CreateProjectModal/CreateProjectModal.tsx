"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { CreateProjectFormSubmitButton } from "../CreateProjectForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface CreateProjectModalProps {
  createProjectFormContainer: React.ReactNode;
}

export function CreateProjectModal({
  createProjectFormContainer,
}: CreateProjectModalProps) {
  const t = useTranslations("dashboard.projects.CreateProjectModal");

  const { isOpen, onOpenChange } = useModal("createProject");

  return (
    <FormBaseModal
      data-test="create-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{createProjectFormContainer}</DialogBody>
        <DialogFooter>
          <CreateProjectFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
