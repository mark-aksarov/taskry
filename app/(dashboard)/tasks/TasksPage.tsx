import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { PageGrid } from "@/components/common/PageGrid";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewTaskFormSkeleton } from "@/components/tasks/NewTaskForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarFiltersBottomSheetTrigger } from "@/components/tasks/TaskToolbarFiltersBottomSheetTrigger";

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
