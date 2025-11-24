import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarCreateNewMenuTrigger,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { UserFiltersFormSkeleton } from "@/components/users/UserFiltersForm";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { UserToolbarActionsMenuTrigger } from "@/components/users/UserToolbarActionsMenuTrigger";
import { UserToolbarFiltersModalTrigger } from "@/components/users/UserToolbarFiltersModalTrigger";

interface UsersPageProps {
  UserFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  UsersServerContainer: React.ComponentType;
}

export async function UsersPage({
  UserFiltersFormContainer,
  NewTaskFormContainer,
  NewProjectFormContainer,
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
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
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
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
            />
          </ToolbarMobileBottom>
          <UsersServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
