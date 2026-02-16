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
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomerToolbarManageMenuTrigger } from "@/components/customer/CustomerToolbarManageMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";

interface CustomersPageProps {
  customerToolbarCreateNewMenuTrigger: React.ReactNode;
  customerToolbarActionsMenuTrigger: React.ReactNode;
  customerToolbarFiltersModalTrigger: React.ReactNode;
  customersContainer: React.ReactNode;
}

export function CustomersPage({
  customerToolbarCreateNewMenuTrigger,
  customerToolbarActionsMenuTrigger,
  customerToolbarFiltersModalTrigger,
  customersContainer,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <CustomerToolbarManageMenuTrigger />
            <CustomerToolbarSortingMenuTrigger />
            {customerToolbarFiltersModalTrigger}
            {customerToolbarActionsMenuTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {customerToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <CustomerToolbarManageMenuTrigger />
            <CustomerToolbarSortingMenuTrigger />
            {customerToolbarFiltersModalTrigger}
            {customerToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {customerToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>
          {customersContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
