"use client";

import {
  UpdateProjectStatusForm,
  UpdateProjectStatusFormSubmitButton,
} from "../UpdateProjectStatusForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateProjectStatusModalProps {
  projectId: number;
  projectStatus: ProjectStatus;
}

export function UpdateProjectStatusModal({
  projectId,
  projectStatus,
}: UpdateProjectStatusModalProps) {
  const t = useTranslations("projects.UpdateProjectStatusModal");

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
