"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateProjectClientFormSubmitButton } from "../UpdateProjectClientForm";

interface UpdateProjectClientModalProps {
  updateProjectClientFormContainer: React.ReactNode;
}

export function UpdateProjectClientModal({
  updateProjectClientFormContainer,
}: UpdateProjectClientModalProps) {
  const t = useTranslations("dashboard.projects.UpdateProjectClientModal");

  const { isOpen, onOpenChange } = useModal("updateProjectClient");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      data-test="update-project-client-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateProjectClientFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateProjectClientFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
