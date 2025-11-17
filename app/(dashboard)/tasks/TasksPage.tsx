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
import { NewTaskFormSkeleton } from "@/components/tasks/NewTaskForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarFiltersBottomSheetTrigger } from "@/components/tasks/TaskToolbarFiltersBottomSheetTrigger";

interface TasksPageProps {
  TaskFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  TaskViewModeContainer: React.ComponentType;
}

export function TasksPage({
  TaskFiltersFormContainer,
  NewTaskFormContainer,
  NewProjectFormContainer,
  TaskViewModeContainer,
}: TasksPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<TaskFiltersFormSkeleton />}>
                  <TaskFiltersFormContainer />
                </Suspense>
              }
            />
            <TaskToolbarActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />

            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<NewTaskFormSkeleton />}>
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
            <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarFiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<TaskFiltersFormSkeleton />}>
                  <TaskFiltersFormContainer />
                </Suspense>
              }
            />
            <TaskToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<NewTaskFormSkeleton />}>
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

          <TaskViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
