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
import { NewCompanyModal } from "@/components/company/NewCompanyModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewCustomerModal } from "@/components/customer/NewCustomerModal";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { CustomersFilteredEmptySection } from "@/components/customer/CustomersFilteredEmptySection";
import { CustomerToolbarManageMenuTrigger } from "@/components/customer/CustomerToolbarManageMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageProps {
  totalCount: number;
  totalFilteredCustomers: number;
  selectedSortField: CustomerSortField;
  customersContainer: React.ReactNode;
  newCustomerFormContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
}

export function CustomersPage({
  totalCount,
  totalFilteredCustomers,
  selectedSortField,
  customersContainer,
  newCustomerFormContainer,
  filtersFormContainer,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");
  const isFilteredEmpty = totalFilteredCustomers === 0;

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={<CustomerToolbarCreateNewMenuTrigger />}
        />
        <NewCustomerModal newCustomerFormContainer={newCustomerFormContainer} />
        <NewCompanyModal />
      </>
    );
  }

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} className="relative">
        <PageGrid className="flex-auto">
          <ViewModeProvider>
            <ToolbarDesktop>
              <CustomerToolbarManageMenuTrigger />
              <CustomerToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <CustomerToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
              <CustomerToolbarActionsMenuTrigger />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <CustomerToolbarCreateNewMenuTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <CustomerToolbarManageMenuTrigger />
              <CustomerToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <CustomerToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
              <CustomerToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <CustomerToolbarCreateNewMenuTrigger />
            </ToolbarMobileBottom>

            {isFilteredEmpty ? (
              <CustomersFilteredEmptySection />
            ) : (
              customersContainer
            )}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewCustomerModal newCustomerFormContainer={newCustomerFormContainer} />
      <NewCompanyModal />
    </>
  );
}
