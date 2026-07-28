import {
  ToolbarMobile,
  ToolbarLarge,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  TaskFiltersModal,
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

import {
  AssigneeFiltersModal,
  AssigneeFiltersModalTrigger,
} from "@/dashboard/tasks/AssigneeFiltersModal";

import {
  TaskStatusFiltersModal,
  TaskStatusFiltersModalTrigger,
} from "@/dashboard/tasks/TaskStatusFiltersModal";

import {
  TaskProjectFiltersModal,
  TaskProjectFiltersModalTrigger,
} from "@/dashboard/tasks/TaskProjectFiltersModal";

import {
  TaskCategoryFiltersModal,
  TaskCategoryFiltersModalTrigger,
} from "@/dashboard/tasks/TaskCategoryFiltersModal";
import { EntityPagination } from "@/dashboard/common/EntityPagination";

import {
  SelectedTask,
  SelectedTasksProvider,
} from "@/dashboard/tasks/SelectedTasksContext";

import { useTranslations } from "next-intl";
import { TaskFilters, TaskSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { TaskResultsCount } from "@/dashboard/tasks/TaskResultsCount";
import { DeleteTasksModal } from "@/dashboard/tasks/DeleteTasksModal";
import { ImportTasksModal } from "@/dashboard/tasks/ImportTasksModal";
import { TasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { CreateTaskProvider } from "@/dashboard/tasks/CreateTaskContext";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { TaskFiltersProvider } from "@/dashboard/tasks/TaskFiltersContext";
import { TaskActionsMenuTrigger } from "@/dashboard/tasks/TaskActionsMenuTrigger";
import { TaskSortingMenuTriggerLarge } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TaskSortingMenuTriggerMobile } from "@/dashboard/tasks/TaskSortingMenuTrigger";
import { TasksFilteredEmptySection } from "@/dashboard/tasks/TasksFilteredEmptySection";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";
import { CreateTaskCategoryModal } from "@/dashboard/taskCategory/CreateTaskCategoryModal";
import { CreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryContext";

interface TasksPageProps {
  page: number;
  pageSize: number;
  totalCount: number;
  categoryCount: number;
  projectCount: number;
  selectedSortField: TaskSortField;
  selectedItems: SelectedTask[];
  filters: TaskFilters;
  totalFilteredTasks: number;
  taskGrid: React.ReactNode;
  searchContainer: React.ReactNode;
  createTaskFormContainer: React.ReactNode;
  taskFiltersFormContainer: React.ReactNode;
  assigneeFiltersFormContainer: React.ReactNode;
  taskProjectFiltersFormContainer: React.ReactNode;
  taskCategoryFiltersFormContainer: React.ReactNode;
}

export function TasksPage({
  page,
  pageSize,
  totalCount,
  categoryCount,
  projectCount,
  selectedSortField,
  selectedItems,
  filters,
  totalFilteredTasks,
  taskGrid,
  searchContainer,
  createTaskFormContainer,
  taskFiltersFormContainer,
  assigneeFiltersFormContainer,
  taskProjectFiltersFormContainer,
  taskCategoryFiltersFormContainer,
}: TasksPageProps) {
  const t = useTranslations("app.TasksPage");

  const isEmpty = totalCount === 0;
  const isFilteredEmpty = !isEmpty && totalFilteredTasks === 0;

  return (
    <SelectedTasksProvider pageItems={selectedItems}>
      <UpdateTaskStatusesProvider>
        <DeleteTasksProvider>
          <CreateTaskProvider>
            <CreateTaskCategoryProvider>
              <TaskFiltersProvider filters={filters}>
                <DashboardContainer
                  fullscreen={isEmpty || isFilteredEmpty}
                  headerOffset
                >
                  <DashboardGrid className="relative flex-auto">
                    {isEmpty ? (
                      <>
                        <ToolbarLarge
                          firstSlot={<TaskManageMenuTriggerLarge />}
                        />

                        <ToolbarMobile
                          firstSlot={
                            <PageHeadingMobile>
                              {t("heading")}
                            </PageHeadingMobile>
                          }
                          secondSlot={<TaskManageMenuTriggerMobile />}
                        />

                        <AbsoluteCenter className="w-full">
                          <TasksEmptySection />
                        </AbsoluteCenter>
                      </>
                    ) : (
                      <ViewModeProvider>
                        <ToolbarLarge
                          firstSlot={
                            <>
                              <TaskManageMenuTriggerLarge />
                              <TaskSortingMenuTriggerLarge
                                buttonVariant="secondary"
                                selectedSortField={selectedSortField}
                              />
                              <TaskFiltersModalTriggerLarge />
                              <TaskActionsMenuTrigger buttonVariant="secondary" />
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
                          firstSlot={
                            <PageHeadingMobile>
                              {t("heading")}
                            </PageHeadingMobile>
                          }
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
                          {categoryCount > 0 && (
                            <TaskCategoryFiltersModalTrigger />
                          )}
                          {projectCount > 0 && (
                            <TaskProjectFiltersModalTrigger />
                          )}
                          <AssigneeFiltersModalTrigger />
                        </ToolbarFiltersMobile>

                        {!isFilteredEmpty && (
                          <ToolbarMobile
                            firstSlot={
                              <TaskResultsCount count={totalFilteredTasks} />
                            }
                            secondSlot={
                              <TaskSortingMenuTriggerMobile
                                selectedSortField={selectedSortField}
                              />
                            }
                          />
                        )}

                        {isFilteredEmpty ? (
                          <TasksFilteredEmptySection />
                        ) : (
                          <>
                            {taskGrid}

                            <EntityPagination
                              page={page}
                              pageSize={pageSize}
                              totalPages={Math.ceil(
                                totalFilteredTasks / pageSize,
                              )}
                            />
                          </>
                        )}
                      </ViewModeProvider>
                    )}
                  </DashboardGrid>
                </DashboardContainer>

                <TaskSearchModal searchContainer={searchContainer} />
                <CreateTaskModal
                  createTaskFormContainer={createTaskFormContainer}
                />
                <CreateTaskCategoryModal />
                <DeleteTasksModal />

                <TaskFiltersModal
                  filtersFormContainer={taskFiltersFormContainer}
                />
                <TaskStatusFiltersModal />
                <TaskCategoryFiltersModal
                  filtersFormContainer={taskCategoryFiltersFormContainer}
                />
                <TaskProjectFiltersModal
                  filtersFormContainer={taskProjectFiltersFormContainer}
                />
                <AssigneeFiltersModal
                  filtersFormContainer={assigneeFiltersFormContainer}
                />
                <ImportTasksModal />
              </TaskFiltersProvider>
            </CreateTaskCategoryProvider>
          </CreateTaskProvider>
        </DeleteTasksProvider>
      </UpdateTaskStatusesProvider>
    </SelectedTasksProvider>
  );
}
