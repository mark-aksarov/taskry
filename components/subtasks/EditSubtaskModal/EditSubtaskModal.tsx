import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal
      data-test="edit-subtask-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <DialogBody>{editSubtaskForm}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="edit-subtask-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
