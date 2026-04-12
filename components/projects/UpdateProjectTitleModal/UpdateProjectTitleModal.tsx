"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import {
  UpdateProjectTitleForm,
  UpdateProjectTitleFormSubmitButton,
} from "../UpdateProjectTitleForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectTitleModalProps {
  projectId: number;
  title: string;
}

export function UpdateProjectTitleModal({
  projectId,
  title,
}: UpdateProjectTitleModalProps) {
  const t = useTranslations("projects.UpdateProjectTitleModal");

  const { isOpen, onOpenChange } = useModal("updateProjectTitle");

  return (
    <FormBaseModal
      data-test="update-project-title-modal"
      isOpen={isOpen}
      className="md:w-[350px]"
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateProjectTitleForm projectId={projectId} title={title} />
        </DialogBody>
        <DialogFooter>
          <UpdateProjectTitleFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
