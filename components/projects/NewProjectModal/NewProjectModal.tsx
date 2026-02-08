import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal data-test="new-project-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newProjectFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="new-project-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
