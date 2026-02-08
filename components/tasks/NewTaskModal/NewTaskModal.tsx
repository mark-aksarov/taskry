import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
        <DialogBody>{newTaskFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="new-task-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
