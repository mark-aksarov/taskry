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
import { SelectedItemsProvider } from "@/components/common/SelectedItemsContext";

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
          <SelectedItemsProvider>
            <ToolbarDesktop>
              {companyToolbarActionsMenuTrigger}
              {companyToolbarCreateNewModalTrigger}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              {companyToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                {companyToolbarCreateNewModalTrigger}
              </div>
            </ToolbarMobileBottom>

            {companiesContainer}
          </SelectedItemsProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
