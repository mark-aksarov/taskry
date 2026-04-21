"use client";

import {
  UpdateProjectDeadlineForm,
  UpdateProjectDeadlineFormSubmitButton,
} from "../UpdateProjectDeadlineForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateProjectDeadlineModalProps {
  projectId: number;
  projectDeadline: string;
}

export function UpdateProjectDeadlineModal({
  projectId,
  projectDeadline,
}: UpdateProjectDeadlineModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectDeadlineModal");

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
