import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import {
  CustomerFiltersModalTriggerLarge,
  CustomerFiltersModalTriggerMobile,
} from "@/components/customer/CustomerFiltersModal";

import {
  CustomerManageMenuTriggerLarge,
  CustomerManageMenuTriggerMobile,
} from "@/components/customer/CustomerManageMenuTrigger";

import {
  CustomerSortingMenuTriggerLarge,
  CustomerSortingMenuTriggerMobile,
} from "@/components/customer/CustomerSortingMenuTrigger";

import {
  CreateCustomerMenuTriggerLarge,
  CreateCustomerMenuTriggerMobile,
} from "@/components/customer/CreateCustomerMenuTrigger";

import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewCompanyModal } from "@/components/company/NewCompanyModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewCustomerModal } from "@/components/customer/NewCustomerModal";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/components/search/SearchModalTrigger";
import { CustomerSearchModal } from "@/components/customer/CustomerSearchModal";
import { CustomerResultsCount } from "@/components/customer/CustomerResultsCount";
import { CustomerActionsMenuTrigger } from "@/components/customer/CustomerActionsMenuTrigger";
import { CustomersFilteredEmptySection } from "@/components/customer/CustomersFilteredEmptySection";
import { CustomersEmptySectionCreateButton } from "@/components/customer/CustomersEmptySectionCreateButton";
import { CustomerCompanyFiltersModalTrigger } from "@/components/customer/CustomerCompanyFiltersModal";

interface CustomersPageProps {
  totalCount: number;
  totalFilteredCustomers: number;
  selectedSortField: CustomerSortField;
  searchContainer: React.ReactNode;
  customersContainer: React.ReactNode;
  newCustomerFormContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  companyFiltersFormContainer: React.ReactNode;
}

export function CustomersPage({
  totalCount,
  totalFilteredCustomers,
  selectedSortField,
  searchContainer,
  customersContainer,
  newCustomerFormContainer,
  filtersFormContainer,
  companyFiltersFormContainer,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobile
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
              secondSlot={<CustomerManageMenuTriggerMobile />}
            />

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
            <ToolbarLarge
              firstSlot={
                <>
                  <CustomerManageMenuTriggerLarge />
                  <CustomerSortingMenuTriggerLarge
                    selectedSortField={selectedSortField}
                  />
                  <CustomerFiltersModalTriggerLarge
                    filtersFormContainer={filtersFormContainer}
                  />
                  <CustomerActionsMenuTrigger />
                </>
              }
              secondSlot={
                <>
                  <ViewModeToggleButtonGroup />
                  <CreateCustomerMenuTriggerLarge />
                </>
              }
            />

            <ToolbarMobile
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
              secondSlot={
                <>
                  <CreateCustomerMenuTriggerMobile />
                  <CustomerManageMenuTriggerMobile />
                </>
              }
            />

            <ToolbarSearchMobile>
              <SearchModalTrigger />
            </ToolbarSearchMobile>

            <ToolbarFiltersMobile>
              <CustomerFiltersModalTriggerMobile
                filtersFormContainer={filtersFormContainer}
              />
              <CustomerCompanyFiltersModalTrigger
                filtersFormContainer={companyFiltersFormContainer}
              />
            </ToolbarFiltersMobile>

            {!isFilteredEmpty && (
              <ToolbarMobile
                firstSlot={
                  <CustomerResultsCount count={totalFilteredCustomers} />
                }
                secondSlot={
                  <CustomerSortingMenuTriggerMobile
                    selectedSortField={selectedSortField}
                  />
                }
              />
            )}

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
