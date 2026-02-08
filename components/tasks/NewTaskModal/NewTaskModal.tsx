import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface NewTaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newTaskFormContainer: React.ReactNode;
}

export function NewTaskModal({
  newTaskFormContainer,
  ...props
}: NewTaskModalProps) {
  const t = useTranslations("tasks.NewTaskModal");

  return (
    <FormBaseModal data-test="new-task-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newTaskFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
