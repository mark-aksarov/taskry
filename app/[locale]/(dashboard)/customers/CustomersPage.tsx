import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewCompanyForm } from "@/components/customer/NewCompanyForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";
import { SelectionProvider } from "@/components/common/SelectionContext";

interface CustomersPageProps {
  page: number;
  pageSize: number;
  createCompanyAction: ActionFn<ActionState, FormData>;
  deleteCustomersAction: ActionFn<ActionState, DeleteCustomersPayload>;
  CustomerFiltersFormContainer: React.ComponentType;
  CustomersServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
  }>;
  NewCustomerFormContainer: React.ComponentType;
}

export async function CustomersPage({
  page,
  pageSize,
  createCompanyAction,
  deleteCustomersAction,
  CustomerFiltersFormContainer,
  CustomersServerContainer,
  NewCustomerFormContainer,
}: CustomersPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <CustomerToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                    <CustomerFiltersFormContainer />
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
              <ToolbarMobileHeading>Customers</ToolbarMobileHeading>
              <CustomerToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                    <CustomerFiltersFormContainer />
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
            <CustomersServerContainer page={page} pageSize={pageSize} />
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
