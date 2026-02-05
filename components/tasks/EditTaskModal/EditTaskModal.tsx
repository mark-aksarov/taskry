import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalSubmitButton,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
        <DialogBody>{editTaskFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseModalSubmitButton
            form="edit-task-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
