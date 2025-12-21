import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  page: number;
  pageSize: number;
  TaskFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  TasksServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
  }>;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
}

export function TasksPage({
  page,
  pageSize,
  TaskFiltersFormContainer,
  NewTaskFormContainer,
  TasksServerContainer,
  deleteTasksAction,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

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
            <TaskToolbarActionsMenuTrigger deleteAction={deleteTasksAction} />
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
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <TaskToolbarSortingMenuTrigger />
            <TaskToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<TaskFiltersFormSkeleton />}>
                  <TaskFiltersFormContainer />
                </Suspense>
              }
            />
            <TaskToolbarActionsMenuTrigger deleteAction={deleteTasksAction} />
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

          <TasksServerContainer page={page} pageSize={pageSize} />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
