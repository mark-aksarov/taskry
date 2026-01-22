import { ModalProps } from "@/components/ui";
import { useTranslations } from "next-intl";
import { FormModal } from "@/components/common/FormModal";

interface NewCustomerModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newCustomerForm: React.ReactNode;
}

export function NewCustomerModal({
  newCustomerForm,
  ...props
}: NewCustomerModalProps) {
  const t = useTranslations("customers.NewCustomerModal");

  return (
    <FormModal
      data-test="new-customer-modal"
      formId="new-customer-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newCustomerForm}
      {...props}
    />
  );
}
