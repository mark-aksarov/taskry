import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { CustomerActionsMenuTrigger } from "@/components/customer/CustomerActionsMenuTrigger";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerFiltersForm } from "@/components/customer/CustomerFiltersForm";
import { CompanyCheckboxGroupSkeleton } from "@/components/companies/CompanyCheckboxGroup/CompanyCheckboxGroupSkeleton";

interface CustomersPageProps {
  CompanyCheckboxGroupContainer: React.ComponentType;
  CustomerViewModeContainer: React.ComponentType;
}

export function CustomersPage({
  CompanyCheckboxGroupContainer,
  CustomerViewModeContainer,
}: CustomersPageProps) {
  const customerFiltersForm = (
    <CustomerFiltersForm
      companyCheckboxGroup={
        <Suspense fallback={<CompanyCheckboxGroupSkeleton />}>
          <CompanyCheckboxGroupContainer />
        </Suspense>
      }
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger filtersForm={customerFiltersForm} />
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
            <FiltersBottomSheetTrigger filtersForm={customerFiltersForm} />
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
          <CustomerViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
