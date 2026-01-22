"use client";

import {
  FormModal,
  FormModalDialog,
  FormModalDialogHeader,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps, DialogBody, DialogFooter } from "@/components/ui";

interface EditProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editProjectFormContainer: React.ReactNode;
}

export function EditProjectModal({
  editProjectFormContainer,
  ...props
}: EditProjectModalProps) {
  const t = useTranslations("projects.EditProjectModal");

  return (
    <FormModal {...props}>
      <FormModalDialog>
        <FormModalDialogHeader>{t("title")}</FormModalDialogHeader>
        <DialogBody>{editProjectFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="edit-project-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
