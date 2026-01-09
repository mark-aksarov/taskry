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

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { NewTaskCategoryForm } from "@/components/tasks/NewTaskCategoryForm";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  guestMode?: boolean;
  canCreateTask: boolean;
  canDeleteTask: boolean;
  taskFiltersFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  tasksContainer: React.ReactNode;
  deleteTasksAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateTasksStatusesAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  createTaskCategoryAction: ActionFn<ActionState, FormData>;
}

export function TasksPage({
  guestMode,
  canCreateTask,
  canDeleteTask,
  taskFiltersFormContainer,
  newTaskFormContainer,
  tasksContainer,
  deleteTasksAction,
  updateTasksStatusesAction,
  createTaskCategoryAction,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  const showCreateNewMenuTrigger = canCreateTask || guestMode;

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <TaskToolbarSortingMenuTrigger />
              <TaskToolbarFiltersModalTrigger
                filtersForm={taskFiltersFormContainer}
              />
              <TaskToolbarActionsMenuTrigger
                guestMode={guestMode}
                canDelete={canDeleteTask}
                deleteAction={deleteTasksAction}
                updateStatusAction={updateTasksStatusesAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />

              {showCreateNewMenuTrigger && (
                <TaskToolbarCreateNewMenuTrigger
                  guestMode={guestMode}
                  newTaskForm={newTaskFormContainer}
                  newTaskCategoryForm={
                    <NewTaskCategoryForm
                      formAction={createTaskCategoryAction}
                    />
                  }
                />
              )}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <TaskToolbarSortingMenuTrigger />
              <TaskToolbarFiltersModalTrigger
                filtersForm={taskFiltersFormContainer}
              />
              <TaskToolbarActionsMenuTrigger
                guestMode={guestMode}
                canDelete={canDeleteTask}
                deleteAction={deleteTasksAction}
                updateStatusAction={updateTasksStatusesAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              {showCreateNewMenuTrigger && (
                <TaskToolbarCreateNewMenuTrigger
                  guestMode={guestMode}
                  newTaskForm={newTaskFormContainer}
                  newTaskCategoryForm={
                    <NewTaskCategoryForm
                      formAction={createTaskCategoryAction}
                    />
                  }
                />
              )}
            </ToolbarMobileBottom>

            {tasksContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
