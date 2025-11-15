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
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerActionsMenuTrigger } from "@/components/customer/CustomerActionsMenuTrigger";
import { CustomerFiltersModalTrigger } from "@/components/customer/CustomerFiltersModalTrigger";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerFiltersBottomSheetTrigger } from "@/components/customer/CustomerFiltersBottomSheetTrigger";

interface CustomersPageProps {
  CustomerFiltersFormContainer: React.ComponentType;
  CustomerViewModeContainer: React.ComponentType;
}

export function CustomersPage({
  CustomerFiltersFormContainer,
  CustomerViewModeContainer,
}: CustomersPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <CustomerFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
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
            <CustomerFiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
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
          <CustomerViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
