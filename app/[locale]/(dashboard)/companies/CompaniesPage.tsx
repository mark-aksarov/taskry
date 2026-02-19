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

interface CompaniesPageProps {
  companiesContainer: React.ReactNode;
  companyToolbarCreateNewModalTrigger: React.ReactNode;
  companyToolbarActionsMenuTrigger: React.ReactNode;
}

export function CompaniesPage({
  companiesContainer,
  companyToolbarCreateNewModalTrigger,
  companyToolbarActionsMenuTrigger,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {companyToolbarActionsMenuTrigger}
            {companyToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton />
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
