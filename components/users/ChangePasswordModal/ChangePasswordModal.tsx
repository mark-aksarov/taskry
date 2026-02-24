import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface ChangePasswordModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  userId: string;
  changePassword: ActionFn<ActionState, FormData>;
}

export function ChangePasswordModal({
  userId,
  changePassword,
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
        <FormBaseModalDialogBody>
          <ChangePasswordForm userId={userId} changePassword={changePassword} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
