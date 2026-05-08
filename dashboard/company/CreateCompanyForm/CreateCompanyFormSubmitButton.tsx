import { useTranslations } from "next-intl";
import { useCreateCompany } from "../CreateCompanyContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreateCompanyFormSubmitButton() {
  const t = useTranslations("dashboard.company.CreateCompanyForm");

  const { isPending } = useCreateCompany();

  return (
    <FormBaseSubmitButton
      variant="accent"
      form="create-company-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
