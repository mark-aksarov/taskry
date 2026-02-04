import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface EditSubtaskModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editSubtaskForm: React.ReactNode;
}

export function EditSubtaskModal({
  editSubtaskForm,
  ...props
}: EditSubtaskModalProps) {
  const t = useTranslations("subtasks.EditSubtaskModal");

  return (
    <FormModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <DialogBody>{editSubtaskForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="edit-subtask-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
