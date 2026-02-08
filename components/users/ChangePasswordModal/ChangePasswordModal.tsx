import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseSubmitButton,
} from "@/components/common/FormBaseModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

import { useTranslations } from "next-intl";

interface ChangePasswordModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  changePasswordForm: React.ReactNode;
}

export function ChangePasswordModal({
  changePasswordForm,
  ...props
}: ChangePasswordModalProps) {
  const t = useTranslations("users.ChangePasswordModal");

  return (
    <FormBaseModal
      data-test="change-password-modal"
      className="md:w-[350px]"
      {...props}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{changePasswordForm}</DialogBody>
        <DialogFooter>
          <FormBaseSubmitButton
            form="change-password-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
