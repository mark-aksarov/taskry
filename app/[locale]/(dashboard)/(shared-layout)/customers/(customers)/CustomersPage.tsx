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
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewCustomerModal } from "@/components/customer/NewCustomerModal";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomersFilteredEmptySection } from "@/components/customer/CustomersFilteredEmptySection";
import { CustomerToolbarManageMenuTrigger } from "@/components/customer/CustomerToolbarManageMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomersEmptySectionCreateButton } from "@/components/customer/CustomersEmptySectionCreateButton";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageProps {
  totalCount: number;
  totalFilteredCustomers: number;
  selectedSortField: CustomerSortField;
  searchContainer: React.ReactNode;
  customersContainer: React.ReactNode;
  newCustomerFormContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
}

export function CustomersPage({
  totalCount,
  totalFilteredCustomers,
  selectedSortField,
  searchContainer,
  customersContainer,
  newCustomerFormContainer,
  filtersFormContainer,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <div className="ml-auto">
                <CustomerToolbarManageMenuTrigger />
              </div>
            </ToolbarMobileTop>

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<CustomersEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

        <NewCustomerModal newCustomerFormContainer={newCustomerFormContainer} />
      </>
    );
  }

  const isFilteredEmpty = totalFilteredCustomers === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
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

      <CustomerSearchModal searchContainer={searchContainer} />
      <NewCustomerModal newCustomerFormContainer={newCustomerFormContainer} />
      <NewCompanyModal />
    </>
  );
}
