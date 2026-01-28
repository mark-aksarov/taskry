import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
    <FormModal data-test="edit-project-modal" {...props}>
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
