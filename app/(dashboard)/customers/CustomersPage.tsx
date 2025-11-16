import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarFiltersBottomSheetTrigger } from "@/components/customer/CustomerToolbarFiltersBottomSheetTrigger";

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
            <CustomerToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
                </Suspense>
              }
            />
            <CustomerToolbarActionsMenuTrigger />
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
            <CustomerToolbarFiltersBottomSheetTrigger
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
