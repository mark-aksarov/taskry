import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
    <FormModal {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{newCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="new-customer-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
