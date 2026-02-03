import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

import { useTranslations } from "next-intl";

interface NewUserModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newUserForm: React.ReactNode;
}

export function NewUserModal({ newUserForm, ...props }: NewUserModalProps) {
  const t = useTranslations("users.NewUserModal");

  return (
    <FormModal data-test="new-user-modal" {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newUserForm}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-user-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
