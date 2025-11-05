import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ViewModeContainer,
  ViewModeToggleButtonGroup,
} from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { getCompanies } from "@/lib/queries/companies";
import { CompanyCheckboxGroup } from "@/components/companies/CompanyCheckboxGroup";
import { getCustomers } from "@/lib/queries/customers";
import { CustomerList } from "@/components/customer/CustomerList";
import { CustomerGrid } from "@/components/customer/CustomerGrid";
import { FiltersFormSkeleton } from "@/components/common/FiltersFormSkeleton";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CustomerActionsMenuTrigger } from "@/components/customer/CustomerActionsMenuTrigger";
import { PageContainer } from "@/components/common/PageContainer";

export default async function CustomersPage() {
  const companiesPromise = getCompanies(1);
  const customers = await getCustomers(1);

  const customersFiltersForm = (
    <CustomerFiltersForm
      companyCheckboxGroup={
        <CompanyCheckboxGroup companiesPromise={companiesPromise} />
      }
    />
  );

  if (!customers.length) {
    return (
      <PageContainer fullscreen centered>
        <EmptySection>
          <EmptySectionHeading>No Customers yet</EmptySectionHeading>
          <EmptySectionDescription>
            Add a new customer to start growing your client base
          </EmptySectionDescription>
          <EmptySectionButton href="#">New Customer</EmptySectionButton>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {customersFiltersForm}
                </Suspense>
              }
            />
            <CustomerActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <Button
              label="New Customer"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Customers</ToolbarMobileHeading>
            <FiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {customersFiltersForm}
                </Suspense>
              }
            />
            <CustomerActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <Button
              label="New Customer"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarMobileBottom>
          <ViewModeContainer
            list={<CustomerList customers={customers} />}
            grid={<CustomerGrid customers={customers} />}
          />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
