import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

import { useTranslations } from "next-intl";

interface EditUserModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editUserFormContainer: React.ReactNode;
}

export function EditUserModal({
  editUserFormContainer,
  ...props
}: EditUserModalProps) {
  const t = useTranslations("users.EditUserModal");

  return (
    <FormModal data-test="edit-user-modal" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editUserFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="edit-user-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
