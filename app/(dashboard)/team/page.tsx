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
import { getPositions, getUsers } from "@/lib/queries/user";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { UserActionsMenuTrigger } from "@/components/users/UserActionsMenuTrigger";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { PositionCheckboxGroup } from "@/components/users/PositionCheckboxGroup";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";
import { FiltersFormSkeleton } from "@/components/common/FiltersFormSkeleton";
import { PageContainer } from "@/components/common/PageContainer";

export default async function TeamPage() {
  const positionsPromise = getPositions(1);
  const users = await getUsers(1);

  const usersFiltersForm = (
    <UserFiltersForm
      positionCheckboxGroup={
        <PositionCheckboxGroup positionsPromise={positionsPromise} />
      }
    />
  );

  if (!users.length) {
    return (
      <PageContainer fullscreen centered>
        <EmptySection>
          <EmptySectionHeading>No Users yet</EmptySectionHeading>
          <EmptySectionDescription>
            Add a new user to start building your team
          </EmptySectionDescription>
          <EmptySectionButton href="#">New User</EmptySectionButton>
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
                  {usersFiltersForm}
                </Suspense>
              }
            />
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
            <FiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {usersFiltersForm}
                </Suspense>
              }
            />
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
          <ViewModeContainer
            list={<UserList users={users} />}
            grid={<UserGrid users={users} />}
          />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
