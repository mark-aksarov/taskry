import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { CompanyToolbarCreateNewModalTrigger } from "@/components/company/CompanyToolbarCreateNewModalTrigger";

interface CompaniesPageEmptyProps {
  guestMode: boolean;
  createCompany: ActionFn<ActionState, FormData>;
}

export function CompaniesPageEmpty({
  guestMode,
  createCompany,
}: CompaniesPageEmptyProps) {
  const t = useTranslations("app.CompaniesPageEmpty");

  const companyToolbarCreateNewModalTrigger = (
    <CompanyToolbarCreateNewModalTrigger
      guestMode={guestMode}
      createCompany={createCompany}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={companyToolbarCreateNewModalTrigger}
    />
  );
}
