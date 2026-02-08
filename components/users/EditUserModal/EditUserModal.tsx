import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal data-test="edit-user-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editUserFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="edit-user-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
