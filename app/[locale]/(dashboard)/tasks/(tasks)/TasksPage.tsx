import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { NewTaskCategoryModal } from "@/components/taskCategory/NewTaskCategoryModal";
import { TasksFilteredEmptySection } from "@/components/tasks/TasksFilteredEmptySection";
import { TaskToolbarManageMenuTrigger } from "@/components/tasks/TaskToolbarManageMenuTrigger";
import { TaskToolbarSortingMenuTrigger } from "@/components/tasks/TaskToolbarSortingMenuTrigger";
import { TaskToolbarActionsMenuTrigger } from "@/components/tasks/TaskToolbarActionsMenuTrigger";
import { TaskToolbarFiltersModalTrigger } from "@/components/tasks/TaskToolbarFiltersModalTrigger";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageProps {
  totalCount: number;
  selectedSortField: TaskSortField;
  totalFilteredTasks: number;
  tasksContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
}

export function TasksPage({
  totalCount,
  selectedSortField,
  totalFilteredTasks,
  tasksContainer,
  filtersFormContainer,
  newTaskFormContainer,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={<TaskToolbarCreateNewMenuTrigger />}
        />

        <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
        <NewTaskCategoryModal />
      </>
    );
  }

  return (
    <>
      <PageContainer fullscreen={totalFilteredTasks === 0} className="relative">
        <PageGrid className="flex-auto">
          <ViewModeProvider>
            <ToolbarDesktop>
              <TaskToolbarManageMenuTrigger />
              <TaskToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <TaskToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
              <TaskToolbarActionsMenuTrigger />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <TaskToolbarCreateNewMenuTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <TaskToolbarManageMenuTrigger />
              <TaskToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <TaskToolbarFiltersModalTrigger
                filtersFormContainer={filtersFormContainer}
              />
              <TaskToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <TaskToolbarCreateNewMenuTrigger />
            </ToolbarMobileBottom>

            {totalFilteredTasks === 0 ? (
              <TasksFilteredEmptySection />
            ) : (
              tasksContainer
            )}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
      <NewTaskCategoryModal />
    </>
  );
}
