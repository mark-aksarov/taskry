import { useTranslations } from "next-intl";
import { useUpdateCompany } from "../UpdateCompanyContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateCompanyFormSubmitButton() {
  const t = useTranslations("company.UpdateCompanyForm");

  const { isPending } = useUpdateCompany();

  return (
    <FormBaseSubmitButton
      form="update-company-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
