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
import { TasksFilteredEmptySection } from "@/components/tasks/TasksFilteredEmptySection";
import { TaskToolbarManageMenuTrigger } from "@/components/tasks/TaskToolbarManageMenuTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";

interface TasksPageProps {
  totalFilteredTasks: number;
  tasksContainer: React.ReactNode;
  taskToolbarActionsMenuTrigger: React.ReactNode;
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
  taskToolbarFiltersModalTrigger: React.ReactNode;
  selectedSortField: TaskSortField;
}

export function TasksPage({
  totalFilteredTasks,
  tasksContainer,
  taskToolbarActionsMenuTrigger,
  taskToolbarCreateNewMenuTrigger,
  taskToolbarFiltersModalTrigger,
  selectedSortField,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

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
