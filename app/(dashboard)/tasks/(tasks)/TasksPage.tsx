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
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  TaskFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  TasksServerContainer: React.ComponentType;
}

export function TasksPage({
  TaskFiltersFormContainer,
  NewTaskFormContainer,
  TasksServerContainer,
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

            <TaskToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newTaskCategoryForm={<></>}
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarFiltersModalTrigger
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
            <TaskToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newTaskCategoryForm={<></>}
            />
          </ToolbarMobileBottom>

          <TasksServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
