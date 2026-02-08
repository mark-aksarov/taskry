import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
    <FormBaseModal data-test="new-project-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
