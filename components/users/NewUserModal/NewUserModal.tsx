import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

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
    <FormBaseModal data-test="new-user-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newUserForm}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="new-user-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
