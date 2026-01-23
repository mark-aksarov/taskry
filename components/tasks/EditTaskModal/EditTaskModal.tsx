"use client";

import {
  ModalProps,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";

import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";

interface EditTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editTaskFormContainer: React.ReactNode;
}

export function EditTaskModal({
  editTaskFormContainer,
  ...props
}: EditTaskModalProps) {
  const t = useTranslations("tasks.EditTaskModal");

  return (
    <FormModal data-test="edit-task-modal" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editTaskFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="edit-task-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
