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
import { UserActionsMenuTrigger } from "@/components/users/UserActionsMenuTrigger";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { PositionCheckboxGroupSkeleton } from "@/components/users/PositionCheckboxGroup";

interface UsersPageProps {
  PositionCheckboxGroupContainer: React.ComponentType;
  UserViewModeContainer: React.ComponentType;
}

export function UsersPage({
  PositionCheckboxGroupContainer,
  UserViewModeContainer,
}: UsersPageProps) {
  const userFiltersForm = (
    <UserFiltersForm
      positionCheckboxGroup={
        <Suspense fallback={<PositionCheckboxGroupSkeleton />}>
          <PositionCheckboxGroupContainer />
        </Suspense>
      }
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger filtersForm={userFiltersForm} />
            <UserActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <Button
              label="New User"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Users</ToolbarMobileHeading>
            <FiltersBottomSheetTrigger filtersForm={userFiltersForm} />
            <UserActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <Button
              label="New User"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarMobileBottom>
          <UserViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
