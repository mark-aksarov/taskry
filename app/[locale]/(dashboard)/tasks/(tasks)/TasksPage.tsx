import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { TaskFiltersFormSkeleton } from "@/components/tasks/TaskFiltersForm";
import { NewTaskCategoryForm } from "@/components/tasks/NewTaskCategoryForm";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  page: number;
  pageSize: number;
  sort: string;
  filters: TaskFilters;
  TaskFiltersFormContainer: React.ComponentType<{
    filters: TaskFilters;
  }>;
  NewTaskFormContainer: React.ComponentType;
  TasksServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    filters: TaskFilters;
  }>;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateTasksStatusesAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  createTaskCategoryAction: ActionFn<ActionState, FormData>;
}

export function TasksPage({
  page,
  pageSize,
  sort,
  filters,
  TaskFiltersFormContainer,
  NewTaskFormContainer,
  TasksServerContainer,
  deleteTasksAction,
  updateTasksStatusesAction,
  createTaskCategoryAction,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <TaskToolbarSortingMenuTrigger />
              <TaskToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<TaskFiltersFormSkeleton />}>
                    <TaskFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <TaskToolbarActionsMenuTrigger
                deleteAction={deleteTasksAction}
                updateStatusAction={updateTasksStatusesAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />

              <TaskToolbarCreateNewMenuTrigger
                newTaskForm={
                  <Suspense fallback={<TaskFormBaseSkeleton />}>
                    <NewTaskFormContainer />
                  </Suspense>
                }
                newTaskCategoryForm={
                  <NewTaskCategoryForm formAction={createTaskCategoryAction} />
                }
              />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <TaskToolbarSortingMenuTrigger />
              <TaskToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<TaskFiltersFormSkeleton />}>
                    <TaskFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <TaskToolbarActionsMenuTrigger
                deleteAction={deleteTasksAction}
                updateStatusAction={updateTasksStatusesAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <TaskToolbarCreateNewMenuTrigger
                newTaskForm={
                  <Suspense fallback={<TaskFormBaseSkeleton />}>
                    <NewTaskFormContainer />
                  </Suspense>
                }
                newTaskCategoryForm={
                  <NewTaskCategoryForm formAction={createTaskCategoryAction} />
                }
              />
            </ToolbarMobileBottom>

            <TasksServerContainer
              page={page}
              pageSize={pageSize}
              sort={sort}
              filters={filters}
            />
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
