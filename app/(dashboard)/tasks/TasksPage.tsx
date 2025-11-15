import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button, RACDialogTrigger } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import {
  TaskFiltersForm,
  TaskFiltersFormSkeleton,
} from "@/components/tasks/TaskFiltersForm";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import {
  NewTaskForm,
  NewTaskFormSkeleton,
} from "@/components/tasks/NewTaskForm";
import { TaskFiltersModalTrigger } from "@/components/tasks/TaskFiltersModalTrigger";
import { TaskFiltersBottomSheetTrigger } from "@/components/tasks/TaskFiltersBottomSheetTrigger";

interface TasksPageProps {
  TaskStatusCheckboxGroupContainer: React.ComponentType;
  TaskCategoryCheckboxGroupContainer: React.ComponentType;
  UserCheckboxGroupContainer: React.ComponentType;
  ProjectCheckboxGroupContainer: React.ComponentType;
  TaskCategorySelectContainer: React.ComponentType;
  TaskStatusSelectContainer: React.ComponentType;
  ProjectSelectContainer: React.ComponentType;
  UserSelectContainer: React.ComponentType;
  TaskViewModeContainer: React.ComponentType;
}

export function TasksPage({
  TaskStatusCheckboxGroupContainer,
  TaskCategoryCheckboxGroupContainer,
  UserCheckboxGroupContainer,
  ProjectCheckboxGroupContainer,
  TaskCategorySelectContainer,
  TaskStatusSelectContainer,
  ProjectSelectContainer,
  UserSelectContainer,
  TaskViewModeContainer,
}: TasksPageProps) {
  const taskFiltersForm = (
    <Suspense fallback={<TaskFiltersFormSkeleton />}>
      <TaskFiltersForm
        statusCheckboxGroup={<TaskStatusCheckboxGroupContainer />}
        categoryCheckboxGroup={<TaskCategoryCheckboxGroupContainer />}
        creatorCheckboxGroup={<UserCheckboxGroupContainer />}
        projectCheckboxGroup={<ProjectCheckboxGroupContainer />}
      />
    </Suspense>
  );

  const newTaskForm = (
    <Suspense fallback={<NewTaskFormSkeleton />}>
      <NewTaskForm
        taskStatusSelect={<TaskStatusSelectContainer />}
        taskCategorySelect={<TaskCategorySelectContainer />}
        projectSelect={<ProjectSelectContainer />}
        assigneeSelect={<UserSelectContainer />}
      />
    </Suspense>
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <TaskFiltersModalTrigger filtersForm={taskFiltersForm} />
            <TaskActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <RACDialogTrigger>
              <Button
                label="New Task"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewTaskModal newTaskForm={newTaskForm} />
            </RACDialogTrigger>
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
            <TaskFiltersBottomSheetTrigger filtersForm={taskFiltersForm} />
            <TaskActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <RACDialogTrigger>
              <Button
                label="New Task"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewTaskModal newTaskForm={newTaskForm} />
            </RACDialogTrigger>
          </ToolbarMobileBottom>

          <TaskViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
