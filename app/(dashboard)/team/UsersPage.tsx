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
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarFiltersBottomSheetTrigger } from "@/components/users/UserToolbarFiltersBottomSheetTrigger";

interface UsersPageProps {
  UserFiltersFormContainer: React.ComponentType;
  UserViewModeContainer: React.ComponentType;
}

export function UsersPage({
  UserFiltersFormContainer,
  UserViewModeContainer,
}: UsersPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <UserToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<UserFiltersFormSkeleton />}>
                  <UserFiltersFormContainer />
                </Suspense>
              }
            />
            <UserToolbarActionsMenuTrigger />
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
            <UserToolbarFiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<UserFiltersFormSkeleton />}>
                  <UserFiltersFormContainer />
                </Suspense>
              }
            />
            <UserToolbarActionsMenuTrigger />
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
