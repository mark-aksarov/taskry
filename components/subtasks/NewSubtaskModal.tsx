import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../common/FormBaseModal";

import { ModalProps } from "../ui/Modal";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";

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
    <FormBaseModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>{newSubtaskForm}</FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
