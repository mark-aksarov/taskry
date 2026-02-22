import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomersFilteredEmptySection } from "@/components/customer/CustomersFilteredEmptySection";
import { CustomerToolbarManageMenuTrigger } from "@/components/customer/CustomerToolbarManageMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";

interface CustomersPageProps {
  totalFilteredCustomers: number;
  customerToolbarCreateNewMenuTrigger: React.ReactNode;
  customerToolbarActionsMenuTrigger: React.ReactNode;
  customerToolbarFiltersModalTrigger: React.ReactNode;
  customersContainer: React.ReactNode;
  selectedSortField: CustomerSortField;
}

export function CustomersPage({
  totalFilteredCustomers,
  customerToolbarCreateNewMenuTrigger,
  customerToolbarActionsMenuTrigger,
  customerToolbarFiltersModalTrigger,
  customersContainer,
  selectedSortField,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  return (
    <PageContainer
      fullscreen={totalFilteredCustomers === 0}
      className="relative"
    >
      <PageGrid className="flex-auto">
        <ViewModeProvider>
          <ToolbarDesktop>
            <CustomerToolbarManageMenuTrigger />
            <CustomerToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {customerToolbarFiltersModalTrigger}
            {customerToolbarActionsMenuTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {customerToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <CustomerToolbarManageMenuTrigger />
            <CustomerToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {customerToolbarFiltersModalTrigger}
            {customerToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {customerToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>

          {totalFilteredCustomers === 0 ? (
            <CustomersFilteredEmptySection />
          ) : (
            customersContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
