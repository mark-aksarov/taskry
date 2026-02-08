import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
        <FormBaseModalDialogBody>
          {editProjectFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
