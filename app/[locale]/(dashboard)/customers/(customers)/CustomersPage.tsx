import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  CustomerFiltersModalTriggerLarge,
  CustomerFiltersModalTriggerMobile,
} from "@/dashboard/customer/CustomerFiltersModalTrigger";

import {
  CustomerManageMenuTriggerLarge,
  CustomerManageMenuTriggerMobile,
} from "@/dashboard/customer/CustomerManageMenuTrigger";

import {
  CustomerSortingMenuTriggerLarge,
  CustomerSortingMenuTriggerMobile,
} from "@/dashboard/customer/CustomerSortingMenuTrigger";

import {
  CreateCustomerMenuTriggerLarge,
  CreateCustomerMenuTriggerMobile,
} from "@/dashboard/customer/CreateCustomerMenuTrigger";

import { useTranslations } from "next-intl";
import { CustomerSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CustomerResultsCount } from "@/dashboard/customer/CustomerResultsCount";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { CustomerActionsMenuTrigger } from "@/dashboard/customer/CustomerActionsMenuTrigger";
import { CustomersFilteredEmptySection } from "@/dashboard/customer/CustomersFilteredEmptySection";
import { CustomersEmptySectionCreateButton } from "@/dashboard/customer/CustomersEmptySectionCreateButton";
import { CustomerCompanyFiltersModalTrigger } from "@/dashboard/customer/CustomerCompanyFiltersModalTrigger";

interface CustomersPageProps {
  page: number;
  pageSize: number;
  totalCount: number;
  companyCount: number;
  totalFilteredCustomers: number;
  selectedSortField: CustomerSortField;
  customerGrid: React.ReactNode;
}

export function CustomersPage({
  page,
  pageSize,
  totalCount,
  companyCount,
  totalFilteredCustomers,
  selectedSortField,
  customerGrid,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  if (totalCount === 0) {
    return (
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarLarge firstSlot={<CustomerManageMenuTriggerLarge />} />

          <ToolbarMobile
            firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
            secondSlot={<CustomerManageMenuTriggerMobile />}
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<CustomersEmptySectionCreateButton />}
          />
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  const isFilteredEmpty = totalFilteredCustomers === 0;

  return (
    <DashboardContainer fullscreen={isFilteredEmpty} headerOffset>
      <DashboardGrid className="relative flex-auto">
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={
              <>
                <CustomerManageMenuTriggerLarge />
                <CustomerSortingMenuTriggerLarge
                  selectedSortField={selectedSortField}
                />
                <CustomerFiltersModalTriggerLarge />
                <CustomerActionsMenuTrigger />
              </>
            }
            secondSlot={
              <>
                <ViewModeToggleButtonGroup />
                <CreateCustomerMenuTriggerLarge />
              </>
            }
            twoRowsOnLg
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
            <CustomerFiltersModalTriggerMobile />
            {companyCount > 0 && <CustomerCompanyFiltersModalTrigger />}
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
            <>
              <>{customerGrid}</>
              <EntityPagination
                page={page}
                pageSize={pageSize}
                totalPages={Math.ceil(totalFilteredCustomers / pageSize)}
              />
            </>
          )}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
