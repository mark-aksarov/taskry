import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

import { useTranslations } from "next-intl";

interface NewCustomerModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newCustomerFormContainer: React.ReactNode;
}

export function NewCustomerModal({
  newCustomerFormContainer,
  ...props
}: NewCustomerModalProps) {
  const t = useTranslations("customers.NewCustomerModal");

  return (
    <FormBaseModal data-test="new-customer-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
