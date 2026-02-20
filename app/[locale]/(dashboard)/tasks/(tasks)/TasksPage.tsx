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
import { TaskToolbarManageMenuTrigger } from "@/components/tasks/TaskToolbarManageMenuTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskSortField } from "@/lib/types";

interface TasksPageProps {
  tasksContainer: React.ReactNode;
  taskToolbarActionsMenuTrigger: React.ReactNode;
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
  taskToolbarFiltersModalTrigger: React.ReactNode;
  selectedSortField: TaskSortField;
}

export function TasksPage({
  tasksContainer,
  taskToolbarActionsMenuTrigger,
  taskToolbarCreateNewMenuTrigger,
  taskToolbarFiltersModalTrigger,
  selectedSortField,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  return (
    <PageContainer>
      <PageGrid>
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

          {tasksContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
