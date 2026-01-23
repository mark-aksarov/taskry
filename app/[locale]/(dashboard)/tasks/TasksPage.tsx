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
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";

interface TasksPageProps {
  tasksContainer: React.ReactNode;
  taskToolbarActionsMenuTrigger: React.ReactNode;
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
  taskToolbarFiltersModalTrigger: React.ReactNode;
}

export function TasksPage({
  tasksContainer,
  taskToolbarActionsMenuTrigger,
  taskToolbarCreateNewMenuTrigger,
  taskToolbarFiltersModalTrigger,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <TaskToolbarSortingMenuTrigger />
              {taskToolbarFiltersModalTrigger}
              {taskToolbarActionsMenuTrigger}
              <ViewModeToggleButtonGroup className="ml-auto" />
              {taskToolbarCreateNewMenuTrigger}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <TaskToolbarSortingMenuTrigger />
              {taskToolbarFiltersModalTrigger}
              {taskToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              {taskToolbarCreateNewMenuTrigger}
            </ToolbarMobileBottom>

            {tasksContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
