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
import { SelectionProvider } from "@/components/common/SelectionContext";

interface CompaniesPageProps {
  companiesContainer: React.ReactNode;
  companyToolbarCreateNewButton: React.ReactNode;
  companyToolbarActionsMenuTrigger: React.ReactNode;
}

export function CompaniesPage({
  companiesContainer,
  companyToolbarCreateNewButton,
  companyToolbarActionsMenuTrigger,
}: CompaniesPageProps) {
  const t = useTranslations("app.CompaniesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              {companyToolbarActionsMenuTrigger}
              {companyToolbarCreateNewButton}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              {companyToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">{companyToolbarCreateNewButton}</div>
            </ToolbarMobileBottom>

            {companiesContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
