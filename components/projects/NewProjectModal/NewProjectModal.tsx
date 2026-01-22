import {
  ModalProps,
  DialogBody,
  DialogFooter,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import {
  FormModal,
  FormModalDialog,
  FormModalDialogHeader,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";

interface NewProjectModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newProjectFormContainer: React.ReactNode;
}

export function NewProjectModal({
  newProjectFormContainer,
  ...props
}: NewProjectModalProps) {
  const t = useTranslations("projects.NewProjectModal");

  return (
    <FormModal {...props}>
      <FormModalDialog>
        <FormModalDialogHeader>{t("title")}</FormModalDialogHeader>
        <DialogBody>{newProjectFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-project-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
