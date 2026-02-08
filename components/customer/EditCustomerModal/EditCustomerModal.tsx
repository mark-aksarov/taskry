import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeader } from "@/components/ui/Dialog";

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
        <FormBaseModalDialogBody>
          {editCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
