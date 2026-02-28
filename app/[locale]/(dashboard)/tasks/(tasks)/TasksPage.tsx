import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { TasksFilteredEmptySection } from "@/components/tasks/TasksFilteredEmptySection";
import { TaskToolbarManageMenuTrigger } from "@/components/tasks/TaskToolbarManageMenuTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  selectedSortField: TaskSortField;
  totalFilteredTasks: number;
  tasksContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  createTaskCategory: ActionFn<ActionState, FormData>;
  deleteTasks: ActionFn<ActionState, DeleteTasksPayload>;
}

export function TasksPage({
  selectedSortField,
  totalFilteredTasks,
  tasksContainer,
  filtersFormContainer,
  newTaskFormContainer,
  createTaskCategory,
  deleteTasks,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  const taskToolbarCreateNewMenuTrigger = (
    <TaskToolbarCreateNewMenuTrigger
      newTaskFormContainer={newTaskFormContainer}
      createTaskCategory={createTaskCategory}
    />
  );

  const taskToolbarActionsMenuTrigger = (
    <TaskToolbarActionsMenuTrigger deleteTasks={deleteTasks} />
  );

  const taskToolbarFiltersModalTrigger = (
    <TaskToolbarFiltersModalTrigger
      filtersFormContainer={filtersFormContainer}
    />
  );

  return (
    <PageContainer fullscreen={totalFilteredTasks === 0} className="relative">
      <PageGrid className="flex-auto">
        <ViewModeProvider>
          <ToolbarDesktop>
            <TaskToolbarManageMenuTrigger />
            <TaskToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {taskToolbarFiltersModalTrigger}
            {taskToolbarActionsMenuTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {taskToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <TaskToolbarManageMenuTrigger />
            <TaskToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {taskToolbarFiltersModalTrigger}
            {taskToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {taskToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>

          {totalFilteredTasks === 0 ? (
            <TasksFilteredEmptySection />
          ) : (
            tasksContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
