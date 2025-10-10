import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
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
import { FiltersSideSheetTrigger } from "@/components/common/FiltersSideSheetTrigger";
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
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No Customers yet</EmptySectionHeading>
          <EmptySectionDescription>
            Add a new customer to start growing your client base
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Customer</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return (
    <PageGrid>
      <ViewModeProvider>
        <ToolbarDesktop>
          <FiltersSideSheetTrigger
            filtersForm={
              <Suspense fallback={<FiltersFormSkeleton />}>
                {customersFiltersForm}
              </Suspense>
            }
          />
          <CustomerActionsMenuTrigger />
          <ViewModeToggleButtonGroup className="ml-auto" />
          <Button
            label="New User"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </ToolbarDesktop>

        <ToolbarMobileTop>
          <ToolbarMobileHeading>Users</ToolbarMobileHeading>
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
            label="New User"
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </ToolbarMobileBottom>
        <ViewModeContainer
          list={<CustomerList customers={customers} />}
          grid={<CustomerGrid customers={customers} />}
        />
      </ViewModeProvider>
    </PageGrid>
  );
}
