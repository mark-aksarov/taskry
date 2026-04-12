"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import {
  UpdateProjectDescriptionForm,
  UpdateProjectDescriptionFormSubmitButton,
} from "../UpdateProjectDescriptionForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectDescriptionModalProps {
  projectId: number;
  description?: string;
}

export function UpdateProjectDescriptionModal({
  projectId,
  description,
}: UpdateProjectDescriptionModalProps) {
  const t = useTranslations("projects.UpdateProjectDescriptionModal");

  const { isOpen, onOpenChange } = useModal("updateProjectDescription");

  return (
    <FormBaseModal
      data-test="update-project-description-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateProjectDescriptionForm
            projectId={projectId}
            description={description}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateProjectDescriptionFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
