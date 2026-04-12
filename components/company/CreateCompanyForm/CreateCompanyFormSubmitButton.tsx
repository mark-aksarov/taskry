import { useTranslations } from "next-intl";
import { useCreateCompany } from "../CreateCompanyContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreateCompanyFormSubmitButton() {
  const t = useTranslations("company.CreateCompanyForm");

  const { isPending } = useCreateCompany();

  return (
    <FormBaseSubmitButton
      form="create-company-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
