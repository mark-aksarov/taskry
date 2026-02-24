import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

import { useTranslations } from "next-intl";
import { NewUserForm } from "../NewUserForm";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface NewUserModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  createUser: ActionFn<ActionState, FormData>;
}

export function NewUserModal({ createUser, ...props }: NewUserModalProps) {
  const t = useTranslations("users.NewUserModal");

  return (
    <FormBaseModal data-test="new-user-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewUserForm createUser={createUser} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
