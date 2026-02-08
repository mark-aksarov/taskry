import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "../common/FormBaseModal";

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
    <FormBaseModal
      data-test="new-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <DialogBody>{newSubtaskForm}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="new-subtask-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
