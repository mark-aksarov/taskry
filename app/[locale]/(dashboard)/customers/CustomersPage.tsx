import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarCreateNewMenuTrigger } from "@/components/customer/CustomerToolbarCreateNewMenuTrigger";

interface CustomersPageProps {
  page: number;
  pageSize: number;
  CustomerFiltersFormContainer: React.ComponentType;
  CustomersServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
  }>;
}

export async function CustomersPage({
  page,
  pageSize,
  CustomerFiltersFormContainer,
  CustomersServerContainer,
}: CustomersPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <CustomerToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
                </Suspense>
              }
            />
            <CustomerToolbarActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <CustomerToolbarCreateNewMenuTrigger
              newCustomerForm={<></>}
              newCompanyForm={<></>}
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
            <CustomerToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <CustomerToolbarCreateNewMenuTrigger
              newCustomerForm={<></>}
              newCompanyForm={<></>}
            />
          </ToolbarMobileBottom>
          <CustomersServerContainer page={page} pageSize={pageSize} />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
