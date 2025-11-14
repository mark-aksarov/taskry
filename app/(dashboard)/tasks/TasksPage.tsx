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
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFiltersForm } from "@/components/tasks/TaskFiltersForm";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { UserCheckboxGroupSkeleton } from "@/components/users/UserCheckboxGroup";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { ProjectCheckboxGroupSkeleton } from "@/components/projects/ProjectCheckboxGroup";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { TaskCategoryCheckboxGroupSkeleton } from "@/components/tasks/TaskCategoryCheckboxGroup";
import { NewTaskModal } from "@/components/tasks/NewTaskModal/NewTaskModal";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import {
  FieldGroupSkeleton,
  FieldSkeleton,
} from "@/components/common/FieldSkeleton";

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
    <TaskFiltersForm
      statusCheckboxGroup={
        <Suspense
          fallback={
            <FieldSkeleton>
              <FieldGroupSkeleton />
            </FieldSkeleton>
          }
        >
          <TaskStatusCheckboxGroupContainer />
        </Suspense>
      }
      categoryCheckboxGroup={
        <Suspense fallback={<TaskCategoryCheckboxGroupSkeleton />}>
          <TaskCategoryCheckboxGroupContainer />
        </Suspense>
      }
      creatorCheckboxGroup={
        <Suspense fallback={<UserCheckboxGroupSkeleton />}>
          <UserCheckboxGroupContainer />
        </Suspense>
      }
      projectCheckboxGroup={
        <Suspense fallback={<ProjectCheckboxGroupSkeleton />}>
          <ProjectCheckboxGroupContainer />
        </Suspense>
      }
    />
  );

  const newTaskForm = (
    <NewTaskForm
      taskStatusSelect={
        <Suspense
          fallback={
            <FieldSkeleton>
              <FieldGroupSkeleton />
            </FieldSkeleton>
          }
        >
          <TaskStatusSelectContainer />
        </Suspense>
      }
      taskCategorySelect={
        <Suspense
          fallback={
            <FieldSkeleton>
              <FieldGroupSkeleton />
            </FieldSkeleton>
          }
        >
          <TaskCategorySelectContainer />
        </Suspense>
      }
      projectSelect={
        <Suspense
          fallback={
            <FieldSkeleton>
              <FieldGroupSkeleton />
            </FieldSkeleton>
          }
        >
          <ProjectSelectContainer />
        </Suspense>
      }
      assigneeSelect={
        <Suspense
          fallback={
            <FieldSkeleton>
              <FieldGroupSkeleton />
            </FieldSkeleton>
          }
        >
          <UserSelectContainer />
        </Suspense>
      }
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger filtersForm={taskFiltersForm} />
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
            <FiltersBottomSheetTrigger filtersForm={taskFiltersForm} />
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
