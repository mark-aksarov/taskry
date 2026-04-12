"use client";

import {
  UpdateProjectDeadlineForm,
  UpdateProjectDeadlineFormSubmitButton,
} from "../UpdateProjectDeadlineForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectDeadlineModalProps {
  projectId: number;
  projectDeadline: string;
}

export function UpdateProjectDeadlineModal({
  projectId,
  projectDeadline,
}: UpdateProjectDeadlineModalProps) {
  const t = useTranslations("projects.UpdateProjectDeadlineModal");

  const { isOpen, onOpenChange } = useModal("updateProjectDeadline");

  return (
    <FormBaseModal
      data-test="update-project-deadline-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateProjectDeadlineForm
            projectId={projectId}
            deadline={projectDeadline}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateProjectDeadlineFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
