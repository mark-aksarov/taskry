import {
  DialogBody,
  ModalProps,
  DialogFooter,
  DialogHeader,
} from "@/components/ui";

import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";

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
    <FormModal {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newTaskFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-task-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
