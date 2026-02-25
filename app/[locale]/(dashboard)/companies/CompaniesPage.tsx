import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { BackButton } from "@/components/common/BackButton";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CompanyToolbarActionsMenuTrigger } from "@/components/company/CompanyToolbarActionsMenuTrigger";
import { CompanyToolbarCreateNewModalTrigger } from "@/components/company/CompanyToolbarCreateNewModalTrigger";

interface CompaniesPageProps {
  companiesContainer: React.ReactNode;
  guestMode: boolean;
  createCompany: ActionFn<ActionState, FormData>;
  deleteCompanies: ActionFn<ActionState, number[]>;
}

export function CompaniesPage({
  companiesContainer,
  guestMode,
  createCompany,
  deleteCompanies,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  const companyToolbarActionsMenuTrigger = (
    <CompanyToolbarActionsMenuTrigger
      guestMode={guestMode}
      deleteCompanies={deleteCompanies}
    />
  );

  const companyToolbarCreateNewModalTrigger = (
    <CompanyToolbarCreateNewModalTrigger
      guestMode={guestMode}
      createCompany={createCompany}
    />
  );
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {companyToolbarActionsMenuTrigger}
            {companyToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton href="/customers" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            {companyToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <div className="ml-auto">{companyToolbarCreateNewModalTrigger}</div>
          </ToolbarMobileBottom>

          {companiesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
