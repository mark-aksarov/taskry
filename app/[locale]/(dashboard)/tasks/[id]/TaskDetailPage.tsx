import { useTranslations } from "next-intl";
import { TaskDTO } from "@/lib/data/task/task.dto";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskContext";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CreateSubtaskModal } from "@/dashboard/subtasks/CreateSubtaskModal";
import { UpdateTaskTitleModal } from "@/dashboard/tasks/UpdateTaskTitleModal";
import { DeleteTaskDetailModal } from "@/dashboard/tasks/DeleteTaskDetailModal";
import { UpdateTaskStatusModal } from "@/dashboard/tasks/UpdateTaskStatusModal";
import { TaskDetailCard } from "@/dashboard/tasks/TaskDetailCard/TaskDetailCard";
import { UpdateTaskProjectModal } from "@/dashboard/tasks/UpdateTaskProjectModal";
import { DeleteTaskModalTrigger } from "@/dashboard/tasks/DeleteTaskModalTrigger";
import { UpdateTaskTitleProvider } from "@/dashboard/tasks/UpdateTaskTitleContext";
import { CreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskContext";
import { UpdateTaskAssigneeModal } from "@/dashboard/tasks/UpdateTaskAssigneeModal";
import { UpdateTaskDeadlineModal } from "@/dashboard/tasks/UpdateTaskDeadlineModal";
import { UpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusContext";
import { UpdateTaskProjectProvider } from "@/dashboard/tasks/UpdateTaskProjectContext";
import { UpdateTaskDeadlineProvider } from "@/dashboard/tasks/UpdateTaskDeadlineContext";
import { UpdateTaskAssigneeProvider } from "@/dashboard/tasks/UpdateTaskAssigneeContext";
import { UpdateTaskDescriptionModal } from "@/dashboard/tasks/UpdateTaskDescriptionModal";
import { UpdateTaskCategoryRelModal } from "@/dashboard/tasks/UpdateTaskCategoryRelModal";
import { UpdateTaskStatusAltProvider } from "@/dashboard/tasks/UpdateTaskStatusAltContext";
import { UpdateTaskDescriptionProvider } from "@/dashboard/tasks/UpdateTaskDescriptionContext";
import { UpdateTaskCategoryRelProvider } from "@/dashboard/tasks/UpdateTaskCategoryRelContext";

interface TaskDetailPageProps {
  task: TaskDTO;
  taskDetailCardHeaderContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  updateTaskCategoryRelFormContainer: React.ReactNode;
  updateTaskProjectFormContainer: React.ReactNode;
  updateTaskAssigneeFormContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function TaskDetailPage({
  task,
  taskDetailCardHeaderContainer,
  taskDetailContainer,
  updateTaskCategoryRelFormContainer,
  updateTaskProjectFormContainer,
  updateTaskAssigneeFormContainer,
  searchContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <DeleteTaskProvider>
      <CreateSubtaskProvider>
        <UpdateTaskStatusProvider>
          <UpdateTaskTitleProvider>
            <UpdateTaskDescriptionProvider>
              <UpdateTaskDeadlineProvider>
                <UpdateTaskStatusAltProvider>
                  <UpdateTaskAssigneeProvider>
                    <UpdateTaskCategoryRelProvider>
                      <UpdateTaskProjectProvider>
                        <DashboardContainer>
                          <DashboardGrid>
                            <ToolbarMobile
                              firstSlot={
                                <>
                                  <BackButton fallbackHref="/tasks" />
                                  <PageHeadingMobile>
                                    {t("heading")}
                                  </PageHeadingMobile>
                                </>
                              }
                              secondSlot={
                                <DeleteTaskModalTrigger buttonVariant="secondary" />
                              }
                            />

                            <TaskDetailCard
                              taskDetailCardHeaderContainer={
                                taskDetailCardHeaderContainer
                              }
                              taskDetailContainer={taskDetailContainer}
                            />
                          </DashboardGrid>
                        </DashboardContainer>

                        <DeleteTaskDetailModal
                          taskId={task.id}
                          taskTitle={task.title}
                        />

                        <UpdateTaskTitleModal
                          taskId={task.id}
                          taskTitle={task.title}
                        />

                        <UpdateTaskDescriptionModal
                          taskId={task.id}
                          taskDescription={task.description}
                        />

                        <UpdateTaskDeadlineModal
                          taskId={task.id}
                          taskDeadline={task.deadline}
                        />

                        <UpdateTaskStatusModal
                          taskId={task.id}
                          taskStatus={task.status}
                        />

                        <UpdateTaskCategoryRelModal
                          updateTaskCategoryRelFormContainer={
                            updateTaskCategoryRelFormContainer
                          }
                        />

                        <UpdateTaskProjectModal
                          updateTaskProjectFormContainer={
                            updateTaskProjectFormContainer
                          }
                        />

                        <UpdateTaskAssigneeModal
                          updateTaskAssigneeFormContainer={
                            updateTaskAssigneeFormContainer
                          }
                        />

                        <TaskSearchModal searchContainer={searchContainer} />

                        <CreateSubtaskModal taskId={task.id} />
                      </UpdateTaskProjectProvider>
                    </UpdateTaskCategoryRelProvider>
                  </UpdateTaskAssigneeProvider>
                </UpdateTaskStatusAltProvider>
              </UpdateTaskDeadlineProvider>
            </UpdateTaskDescriptionProvider>
          </UpdateTaskTitleProvider>
        </UpdateTaskStatusProvider>
      </CreateSubtaskProvider>
    </DeleteTaskProvider>
  );
}
