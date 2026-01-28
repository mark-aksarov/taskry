import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
    <FormModal data-test="new-project-modal" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
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
