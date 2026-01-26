import {
  FormModal,
  FormModalDialog,
  FormModalSubmitButton,
} from "@/components/common/FormModal";

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
    <FormModal {...props}>
      <FormModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <DialogBody>{editCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <FormModalSubmitButton
            form="edit-customer-form"
            label={t("submitButtonLabel")}
          />
        </DialogFooter>
      </FormModalDialog>
    </FormModal>
  );
}
