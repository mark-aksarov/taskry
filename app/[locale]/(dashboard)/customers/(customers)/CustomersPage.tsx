import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomersFilteredEmptySection } from "@/components/customer/CustomersFilteredEmptySection";
import { CustomerToolbarManageMenuTrigger } from "@/components/customer/CustomerToolbarManageMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";

interface CustomersPageProps {
  guestMode: boolean;
  totalFilteredCustomers: number;
  selectedSortField: CustomerSortField;
  customersContainer: React.ReactNode;
  newCustomerFormContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  createCompany: ActionFn<ActionState, FormData>;
  deleteCustomers: ActionFn<ActionState, number[]>;
}

export function CustomersPage({
  guestMode,
  totalFilteredCustomers,
  selectedSortField,
  customersContainer,
  newCustomerFormContainer,
  filtersFormContainer,
  createCompany,
  deleteCustomers,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  const customerToolbarCreateNewMenuTrigger = (
    <CustomerToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newCustomerFormContainer={newCustomerFormContainer}
      createCompany={createCompany}
    />
  );

  const customerToolbarActionsMenuTrigger = (
    <CustomerToolbarActionsMenuTrigger deleteCustomers={deleteCustomers} />
  );

  const customerToolbarFiltersModalTrigger = (
    <CustomerToolbarFiltersModalTrigger
      filtersFormContainer={filtersFormContainer}
    />
  );

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
