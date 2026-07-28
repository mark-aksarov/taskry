import {
  CreateTaskModalTriggerLarge,
  CreateTaskModalTriggerMobile,
} from "@/dashboard/tasks/CreateTaskModalTrigger";

import { useTranslations } from "next-intl";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { CreateTaskModal } from "@/dashboard/tasks/CreateTaskModal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { CreateTaskProvider } from "@/dashboard/tasks/CreateTaskContext";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { DashboardCardsGrid } from "@/dashboard/common/DashboardCardsGrid";
import { AssignedTasksSection } from "@/dashboard/tasks/AssignedTasksSection";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { AssignedTasksEmptySection } from "@/dashboard/tasks/TasksEmptySection";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";
import { SelectedTask } from "@/dashboard/tasks/SelectedTasksContext";

interface DashboardPageProps {
  taskPage: number;
  taskPageSize: number;
  totalTaskCount: number;
  selectedItems: SelectedTask[];
  totalProjectsCardContainer: React.ReactNode;
  totalTasksCardContainer: React.ReactNode;
  totalUsersCardContainer: React.ReactNode;
  totalClientsCardContainer: React.ReactNode;
  taskGrid: React.ReactNode;
  searchContainer: React.ReactNode;
  createTaskFormContainer: React.ReactNode;
}

export function DashboardPage({
  taskPage,
  taskPageSize,
  totalTaskCount,
  selectedItems,
  totalProjectsCardContainer,
  totalTasksCardContainer,
  totalUsersCardContainer,
  totalClientsCardContainer,
  taskGrid,
  searchContainer,
  createTaskFormContainer,
}: DashboardPageProps) {
  const t = useTranslations("app.DashboardPage");

  const hasTasks = totalTaskCount > 0;

  return (
    <SelectedTasksProvider pageItems={selectedItems}>
      <DeleteTasksProvider>
        <CreateTaskProvider>
          <UpdateTaskStatusesProvider>
            <DashboardContainer>
              <DashboardGrid>
                <ViewModeProvider>
                  <ToolbarMobile
                    firstSlot={
                      <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                    }
                  />

                  <DashboardCardsGrid>
                    {totalProjectsCardContainer}
                    {totalTasksCardContainer}
                    {totalUsersCardContainer}
                    {totalClientsCardContainer}
                  </DashboardCardsGrid>

                  <AssignedTasksSection
                    createTaskButton={
                      hasTasks && (
                        <>
                          <CreateTaskModalTriggerLarge className="max-md:hidden" />
                          <CreateTaskModalTriggerMobile className="md:hidden" />
                        </>
                      )
                    }
                    taskGrid={
                      hasTasks ? (
                        <>
                          {taskGrid}

                          <EntityPagination
                            page={taskPage}
                            pageSize={taskPageSize}
                            totalPages={Math.ceil(
                              totalTaskCount / taskPageSize,
                            )}
                          />
                        </>
                      ) : (
                        <div className="flex h-[25rem] items-center justify-center">
                          <AssignedTasksEmptySection headingClassName="max-md:text-3xl md:text-4xl" />
                        </div>
                      )
                    }
                  />
                </ViewModeProvider>
              </DashboardGrid>
            </DashboardContainer>

            <CreateTaskModal
              createTaskFormContainer={createTaskFormContainer}
            />
            <TaskSearchModal searchContainer={searchContainer} />
          </UpdateTaskStatusesProvider>
        </CreateTaskProvider>
      </DeleteTasksProvider>
    </SelectedTasksProvider>
  );
}
