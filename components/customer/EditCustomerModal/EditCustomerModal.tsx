import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalSubmitButton,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface EditCustomerModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  editCustomerFormContainer: React.ReactNode;
}

export function EditCustomerModal({
  editCustomerFormContainer,
  ...props
}: EditCustomerModalProps) {
  const t = useTranslations("customers.EditCustomerModal");

  return (
    <FormBaseModal data-test="edit-customer-modal" {...props}>
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <FormBaseModalSubmitButton
            form="edit-customer-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
