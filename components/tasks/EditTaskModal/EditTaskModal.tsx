import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
    <FormBaseModal data-test="edit-task-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
