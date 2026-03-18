import {
  ToolbarMobile,
  ToolbarLarge,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import {
  TaskFiltersModalTriggerLarge,
  TaskFiltersModalTriggerMobile,
} from "@/components/tasks/TaskFiltersModal";

import {
  CreateTaskMenuTriggerMobile,
  CreateTaskMenuTriggerLarge,
} from "@/components/tasks/CreateTaskMenuTrigger";

import {
  TaskManageMenuTriggerLarge,
  TaskManageMenuTriggerMobile,
} from "@/components/tasks/TaskManageMenuTrigger";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { TaskResultsCount } from "@/components/tasks/TaskResultsCount";
import { TasksEmptySection } from "@/components/tasks/TasksEmptySection";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/components/search/SearchModalTrigger";
import { TaskActionsMenuTrigger } from "@/components/tasks/TaskActionsMenuTrigger";
import { NewTaskCategoryModal } from "@/components/taskCategory/NewTaskCategoryModal";
import { TaskSortingMenuTriggerLarge } from "@/components/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/components/tasks/TaskSortingMenuTrigger";
import { TasksFilteredEmptySection } from "@/components/tasks/TasksFilteredEmptySection";
import { TaskStatusFiltersModalTrigger } from "@/components/tasks/TaskStatusFiltersModal";
import { TaskProjectFiltersModalTrigger } from "@/components/tasks/TaskProjectFiltersModal";
import { TaskAssigneeFiltersModalTrigger } from "@/components/tasks/TaskAssigneeFiltersModal";
import { TaskCategoryFiltersModalTrigger } from "@/components/tasks/TaskCategoryFiltersModal";

interface TasksPageProps {
  totalCount: number;
  selectedSortField: TaskSortField;
  totalFilteredTasks: number;
  tasksContainer: React.ReactNode;
  searchContainer: React.ReactNode;
  filtersFormContainer: React.ReactNode;
  taskCategoryFiltersFormContainer: React.ReactNode;
  projectFiltersFormContainer: React.ReactNode;
  assigneeFiltersFormContainer: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
}

export function TasksPage({
  totalCount,
  selectedSortField,
  totalFilteredTasks,
  tasksContainer,
  searchContainer,
  filtersFormContainer,
  taskCategoryFiltersFormContainer,
  projectFiltersFormContainer,
  assigneeFiltersFormContainer,
  newTaskFormContainer,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarLarge firstSlot={<TaskManageMenuTriggerLarge />} />

            <ToolbarMobile
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
              secondSlot={<TaskManageMenuTriggerMobile />}
            />

            <AbsoluteCenter className="w-full">
              <TasksEmptySection />
            </AbsoluteCenter>
          </PageGrid>
        </PageContainer>

        <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
      </>
    );
  }

  const isFilteredEmpty = totalFilteredTasks === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
          <ViewModeProvider>
            <ToolbarLarge
              firstSlot={
                <>
                  <TaskManageMenuTriggerLarge />
                  <TaskSortingMenuTriggerLarge
                    selectedSortField={selectedSortField}
                  />
                  <TaskFiltersModalTriggerLarge
                    filtersFormContainer={filtersFormContainer}
                  />
                  <TaskActionsMenuTrigger />
                </>
              }
              secondSlot={
                <>
                  <ViewModeToggleButtonGroup />
                  <CreateTaskMenuTriggerLarge />
                </>
              }
              twoRowsOnLg
            />

            <ToolbarMobile
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
              secondSlot={
                <>
                  <CreateTaskMenuTriggerMobile />
                  <TaskManageMenuTriggerMobile />
                </>
              }
            />

            <ToolbarSearchMobile>
              <SearchModalTrigger />
            </ToolbarSearchMobile>

            <ToolbarFiltersMobile>
              <TaskFiltersModalTriggerMobile
                filtersFormContainer={filtersFormContainer}
              />
              <TaskStatusFiltersModalTrigger />
              <TaskCategoryFiltersModalTrigger
                filtersFormContainer={taskCategoryFiltersFormContainer}
              />
              <TaskProjectFiltersModalTrigger
                filtersFormContainer={projectFiltersFormContainer}
              />
              <TaskAssigneeFiltersModalTrigger
                filtersFormContainer={assigneeFiltersFormContainer}
              />
            </ToolbarFiltersMobile>

            {!isFilteredEmpty && (
              <ToolbarMobile
                firstSlot={<TaskResultsCount count={totalFilteredTasks} />}
                secondSlot={
                  <TaskSortingMenuTriggerMobile
                    selectedSortField={selectedSortField}
                  />
                }
              />
            )}

            {isFilteredEmpty ? <TasksFilteredEmptySection /> : tasksContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <NewTaskModal newTaskFormContainer={newTaskFormContainer} />
      <NewTaskCategoryModal />
    </>
  );
}
