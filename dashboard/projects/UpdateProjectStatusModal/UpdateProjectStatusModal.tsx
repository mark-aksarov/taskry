"use client";

import {
  UpdateProjectStatusForm,
  UpdateProjectStatusFormSubmitButton,
} from "../UpdateProjectStatusForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateProjectStatusModalProps {
  projectId: number;
  projectStatus: ProjectStatus;
}

export function UpdateProjectStatusModal({
  projectId,
  projectStatus,
}: UpdateProjectStatusModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectStatusModal");

  const { isOpen, onOpenChange } = useModal("updateProjectStatus");

  return (
    <FormBaseModal
      data-test="update-project-status-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateProjectStatusForm
            projectId={projectId}
            status={projectStatus}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateProjectStatusFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
