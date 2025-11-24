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
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";
import { UserToolbarCreateNewMenuTrigger } from "@/components/users/UserToolbarCreateNewMenuTrigger";

interface UsersPageProps {
  UserFiltersFormContainer: React.ComponentType;
  UsersServerContainer: React.ComponentType;
}

export async function UsersPage({
  UserFiltersFormContainer,
  UsersServerContainer,
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
            <UserToolbarCreateNewMenuTrigger
              newUserForm={<></>}
              newPositionForm={<></>}
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Users</ToolbarMobileHeading>
            <UserToolbarFiltersModalTrigger
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
            <UserToolbarCreateNewMenuTrigger
              newUserForm={<></>}
              newPositionForm={<></>}
            />
          </ToolbarMobileBottom>
          <UsersServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
