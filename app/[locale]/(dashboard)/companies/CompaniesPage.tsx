import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewCompanyModal } from "@/components/company/NewCompanyModal";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { CompanyToolbarActionsMenuTrigger } from "@/components/company/CompanyToolbarActionsMenuTrigger";
import { CompanyToolbarCreateNewModalTrigger } from "@/components/company/CompanyToolbarCreateNewModalTrigger";

interface CompaniesPageProps {
  totalCount: number;
  companiesContainer: React.ReactNode;
}

export function CompaniesPage({
  totalCount,
  companiesContainer,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={<CompanyToolbarCreateNewModalTrigger />}
        />
        <NewCompanyModal />
      </>
    );
  }

  return (
    <>
      <PageContainer>
        <PageGrid>
          <ViewModeProvider>
            <ToolbarDesktop>
              <CompanyToolbarActionsMenuTrigger />
              <CompanyToolbarCreateNewModalTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <CompanyToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                <CompanyToolbarCreateNewModalTrigger />
              </div>
            </ToolbarMobileBottom>

            {companiesContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewCompanyModal />
    </>
  );
}
