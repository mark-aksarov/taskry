"use client";

import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import {
  ModalProps,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";

import { useTranslations } from "next-intl";

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
        <DialogHeader>{t("title")}</DialogHeader>
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
