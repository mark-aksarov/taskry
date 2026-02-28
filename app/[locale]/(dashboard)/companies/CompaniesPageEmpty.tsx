import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { CompanyToolbarCreateNewModalTrigger } from "@/components/company/CompanyToolbarCreateNewModalTrigger";

interface CompaniesPageEmptyProps {
  createCompany: ActionFn<ActionState, FormData>;
}

export function CompaniesPageEmpty({ createCompany }: CompaniesPageEmptyProps) {
  const t = useTranslations("app.CompaniesPageEmpty");

  const companyToolbarCreateNewModalTrigger = (
    <CompanyToolbarCreateNewModalTrigger createCompany={createCompany} />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={companyToolbarCreateNewModalTrigger}
    />
  );
}
