import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateProjectCustomer } from "../UpdateProjectCustomerContext";

export function UpdateProjectCustomerFormSubmitButton() {
  const t = useTranslations("projects.UpdateProjectCustomerForm");

  const { isPending } = useUpdateProjectCustomer();

  return (
    <FormBaseSubmitButton
      form="update-project-customer-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
