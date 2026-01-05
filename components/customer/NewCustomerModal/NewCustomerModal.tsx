import { ModalProps } from "@/components/ui";
import { useTranslations } from "next-intl";
import { FormBaseModal } from "@/components/common/FormBaseModal";

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
    <FormBaseModal
      formId="new-customer-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newCustomerForm}
      {...props}
    />
  );
}
