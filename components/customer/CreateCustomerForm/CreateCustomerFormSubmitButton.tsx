import { useTranslations } from "next-intl";
import { useCreateCustomer } from "../CreateCustomerContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreateCustomerFormSubmitButton() {
  const t = useTranslations("customers.CreateCustomerForm");

  const { isPending } = useCreateCustomer();

  return (
    <FormBaseSubmitButton
      form="create-customer-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
