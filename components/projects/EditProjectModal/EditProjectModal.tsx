import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal data-test="edit-project-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editProjectFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="edit-project-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
