import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormModal } from "@/components/common/FormModal";

interface NewCompanyModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newCompanyForm: React.ReactNode;
}

export function NewCompanyModal({
  newCompanyForm,
  ...props
}: NewCompanyModalProps) {
  const t = useTranslations("customers.NewCompanyModal");

  return (
    <FormModal
      formId="new-company-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newCompanyForm}
      className="md:w-[350px]"
      {...props}
    />
  );
}
