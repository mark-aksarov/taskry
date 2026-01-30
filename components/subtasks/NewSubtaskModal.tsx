import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "../common/FormModal";

import { ModalProps } from "../ui/Modal";
import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "../ui/Dialog";

interface EditSubtaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newSubtaskForm: React.ReactNode;
}

export function NewSubtaskModal({
  newSubtaskForm,
  ...props
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.NewSubtaskModal");

  return (
    <FormModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <DialogBody>{newSubtaskForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-subtask-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
