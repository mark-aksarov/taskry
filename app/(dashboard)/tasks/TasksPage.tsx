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
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { NewTaskFormSkeleton } from "@/components/tasks/NewTaskForm";
import { TaskFiltersModalTrigger } from "@/components/tasks/TaskFiltersModalTrigger";
import { TaskFiltersBottomSheetTrigger } from "@/components/tasks/TaskFiltersBottomSheetTrigger";
import { TaskSortingMenuTrigger } from "@/components/tasks/TaskSortingMenuTrigger";

interface TasksPageProps {
  TaskFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  TaskViewModeContainer: React.ComponentType;
}

export function TasksPage({
  TaskFiltersFormContainer,
  NewTaskFormContainer,
  TaskViewModeContainer,
}: TasksPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <TaskSortingMenuTrigger />
            <TaskFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<TaskFiltersFormSkeleton />}>
                  <TaskFiltersFormContainer />
                </Suspense>
              }
            />
            <TaskActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <RACDialogTrigger>
              <Button
                label="New Task"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewTaskModal
                newTaskForm={
                  <Suspense fallback={<NewTaskFormSkeleton />}>
                    <NewTaskFormContainer />
                  </Suspense>
                }
              />
            </RACDialogTrigger>
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Tasks</ToolbarMobileHeading>
            <TaskSortingMenuTrigger />
            <TaskFiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<TaskFiltersFormSkeleton />}>
                  <TaskFiltersFormContainer />
                </Suspense>
              }
            />
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
              <NewTaskModal
                newTaskForm={
                  <Suspense fallback={<NewTaskFormSkeleton />}>
                    <NewTaskFormContainer />
                  </Suspense>
                }
              />
            </RACDialogTrigger>
          </ToolbarMobileBottom>

          <TaskViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
