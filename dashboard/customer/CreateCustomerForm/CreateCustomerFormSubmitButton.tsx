import { useTranslations } from "next-intl";
import { useCreateCustomer } from "../CreateCustomerContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreateCustomerFormSubmitButton() {
  const t = useTranslations("dashboard.customers.CreateCustomerForm");

  const { isPending } = useCreateCustomer();

  return (
    <FormBaseSubmitButton
      form="create-customer-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
