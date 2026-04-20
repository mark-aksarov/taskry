import {
  ToolbarMobile,
  ToolbarLarge,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  TaskFiltersModalTriggerLarge,
  TaskFiltersModalTriggerMobile,
} from "@/dashboard/tasks/TaskFiltersModal";

import {
  CreateTaskMenuTriggerMobile,
  CreateTaskMenuTriggerLarge,
} from "@/dashboard/tasks/CreateTaskMenuTrigger";

import {
  TaskManageMenuTriggerLarge,
  TaskManageMenuTriggerMobile,
} from "@/dashboard/tasks/TaskManageMenuTrigger";

import { useTranslations } from "next-intl";
import { TaskSortField } from "@/lib/types";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { TaskResultsCount } from "@/dashboard/tasks/TaskResultsCount";
import { TasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { AssigneeFiltersModalTrigger } from "@/dashboard/tasks/AssigneeFiltersModal";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TasksFilteredEmptySection } from "@/dashboard/tasks/TasksFilteredEmptySection";
import { TaskStatusFiltersModalTrigger } from "@/dashboard/tasks/TaskStatusFiltersModal";
import { TaskProjectFiltersModalTrigger } from "@/dashboard/tasks/TaskProjectFiltersModal";
import { TaskCategoryFiltersModalTrigger } from "@/dashboard/tasks/TaskCategoryFiltersModal";

interface TasksPageProps {
  totalCount: number;
  selectedSortField: TaskSortField;
  totalFilteredTasks: number;
  tasksContainer: React.ReactNode;
}

export function TasksPage({
  totalCount,
  selectedSortField,
  totalFilteredTasks,
  tasksContainer,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  if (totalCount === 0) {
    return (
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
    );
  }

  const isFilteredEmpty = totalFilteredTasks === 0;

  return (
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
                <TaskFiltersModalTriggerLarge />
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
            <TaskFiltersModalTriggerMobile />
            <TaskStatusFiltersModalTrigger />
            <TaskCategoryFiltersModalTrigger />
            <TaskProjectFiltersModalTrigger />
            <AssigneeFiltersModalTrigger />
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
  );
}
