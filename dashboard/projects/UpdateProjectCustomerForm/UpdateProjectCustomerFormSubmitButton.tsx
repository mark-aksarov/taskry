import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectCustomer } from "../UpdateProjectCustomerContext";

export function UpdateProjectCustomerFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectCustomerForm");

  const { isPending } = useUpdateProjectCustomer();

  return (
    <FormBaseSubmitButton
      form="update-project-customer-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
