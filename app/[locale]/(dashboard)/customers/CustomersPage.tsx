import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerFilters } from "@/lib/data/customer/customer.dto";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarSortingMenuTrigger } from "@/components/customer/CustomerToolbarSortingMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageProps {
  page: number;
  pageSize: number;
  sort: string;
  filters: CustomerFilters;
  createCompanyAction: ActionFn<ActionState, FormData>;
  deleteCustomersAction: ActionFn<ActionState, DeleteCustomersPayload>;
  CustomerFiltersFormContainer: React.ComponentType<{
    filters: CustomerFilters;
  }>;
  CustomersServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    filters?: CustomerFilters;
  }>;
  NewCustomerFormContainer: React.ComponentType;
}

export function CustomersPage({
  page,
  pageSize,
  sort,
  filters,
  createCompanyAction,
  deleteCustomersAction,
  CustomerFiltersFormContainer,
  CustomersServerContainer,
  NewCustomerFormContainer,
}: CustomersPageProps) {
  const t = useTranslations("app.CustomersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <CustomerToolbarSortingMenuTrigger />
              <CustomerToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                    <CustomerFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <CustomerToolbarActionsMenuTrigger
                deleteAction={deleteCustomersAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <CustomerToolbarCreateNewMenuTrigger
                newCustomerForm={<NewCustomerFormContainer />}
                newCompanyForm={
                  <NewCompanyForm formAction={createCompanyAction} />
                }
              />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <CustomerToolbarSortingMenuTrigger />
              <CustomerToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                    <CustomerFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <CustomerToolbarActionsMenuTrigger
                deleteAction={deleteCustomersAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <CustomerToolbarCreateNewMenuTrigger
                newCustomerForm={<NewCustomerFormContainer />}
                newCompanyForm={
                  <NewCompanyForm formAction={createCompanyAction} />
                }
              />
            </ToolbarMobileBottom>
            <CustomersServerContainer
              page={page}
              pageSize={pageSize}
              sort={sort}
              filters={filters}
            />
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
