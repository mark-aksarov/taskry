import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
        <FormBaseModalDialogBody>
          {editUserFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
