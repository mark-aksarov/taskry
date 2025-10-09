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
import { getPositions, getUsers } from "@/lib/queries/user";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { UserActionsMenuTrigger } from "@/components/users/UserActionsMenuTrigger";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { PositionCheckboxGroup } from "@/components/users/PositionCheckboxGroup";
import { UserList } from "@/components/users/UserList";
import { UserGrid } from "@/components/users/UserGrid";

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
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No Users yet</EmptySectionHeading>
          <EmptySectionDescription>
            Add a new user to start building your team
          </EmptySectionDescription>
          <EmptySectionLink href="#">New User</EmptySectionLink>
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
              <Suspense fallback={<TaskFiltersFormSkeleton />}>
                {usersFiltersForm}
              </Suspense>
            }
          />
          <UserActionsMenuTrigger />
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
              <Suspense fallback={<TaskFiltersFormSkeleton />}>
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
            iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
          />
        </ToolbarMobileBottom>
        <ViewModeContainer
          list={<UserList users={users} />}
          grid={<UserGrid users={users} />}
        />
      </ViewModeProvider>
    </PageGrid>
  );
}
