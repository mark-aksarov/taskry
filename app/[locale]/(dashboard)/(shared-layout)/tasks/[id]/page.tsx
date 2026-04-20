import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskFormData } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/dashboard/subtasks/CreateSubtaskModal";
import { UpdateTaskTitleModal } from "@/dashboard/tasks/UpdateTaskTitleModal";
import { DeleteTaskDetailModal } from "@/dashboard/tasks/DeleteTaskDetailModal";
import { UpdateTaskStatusModal } from "@/dashboard/tasks/UpdateTaskStatusModal";
import { TaskDetailAltContainer } from "@/dashboard/tasks/TaskDetailAltContainer";
import { UpdateTaskProjectModal } from "@/dashboard/tasks/UpdateTaskProjectModal";
import { UpdateTaskTitleProvider } from "@/dashboard/tasks/UpdateTaskTitleProvider";
import { UpdateTaskAssigneeModal } from "@/dashboard/tasks/UpdateTaskAssigneeModal";
import { UpdateTaskDeadlineModal } from "@/dashboard/tasks/UpdateTaskDeadlineModal";
import { CreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskProvider";
import { UpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider";
import { UpdateTaskProjectProvider } from "@/dashboard/tasks/UpdateTaskProjectProvider";
import { UpdateTaskDescriptionModal } from "@/dashboard/tasks/UpdateTaskDescriptionModal";
import { UpdateTaskDeadlineProvider } from "@/dashboard/tasks/UpdateTaskDeadlineProvider";
import { UpdateTaskAssigneeProvider } from "@/dashboard/tasks/UpdateTaskAssigneeProvider";
import { UpdateTaskCategoryRelModal } from "@/dashboard/tasks/UpdateTaskCategoryRelModal";
import { UpdateTaskStatusAltProvider } from "@/dashboard/tasks/UpdateTaskStatusAltProvider";
import { TaskDetailCardHeaderContainer } from "@/dashboard/tasks/TaskDetailCardHeaderContainer";
import { UpdateTaskDescriptionProvider } from "@/dashboard/tasks/UpdateTaskDescriptionProvider";
import { UpdateTaskCategoryRelProvider } from "@/dashboard/tasks/UpdateTaskCategoryRelProvider";
import { UpdateTaskProjectFormContainer } from "@/dashboard/tasks/UpdateTaskProjectFormContainer";
import { UpdateTaskAssigneeFormContainer } from "@/dashboard/tasks/UpdateTaskAssigneeFormContainer";
import { UpdateTaskCategoryRelFormContainer } from "@/dashboard/tasks/UpdateTaskCategoryRelFormContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  // Validation
  const { id: rawTaskId } = await params;

  const parsed = taskId.safeParse(rawTaskId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get task summary
  const taskFormData = await getTaskFormData(id);

  if (!taskFormData) {
    notFound();
  }

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
                        <TaskDetailPage
                          taskDetailCardHeaderContainer={
                            <TaskDetailCardHeaderContainer taskId={id} />
                          }
                          taskDetailContainer={
                            <TaskDetailAltContainer taskId={id} />
                          }
                        />

                        <DeleteTaskDetailModal
                          taskId={taskFormData.id}
                          taskTitle={taskFormData.title}
                        />

                        <UpdateTaskTitleModal
                          taskId={taskFormData.id}
                          taskTitle={taskFormData.title}
                        />

                        <UpdateTaskDescriptionModal
                          taskId={taskFormData.id}
                          taskDescription={taskFormData.description}
                        />

                        <UpdateTaskDeadlineModal
                          taskId={taskFormData.id}
                          taskDeadline={taskFormData.deadline}
                        />

                        <UpdateTaskStatusModal
                          taskId={taskFormData.id}
                          taskStatus={taskFormData.status}
                        />

                        <UpdateTaskCategoryRelModal
                          updateTaskCategoryRelFormContainer={
                            <UpdateTaskCategoryRelFormContainer
                              taskId={taskFormData.id}
                              categoryId={taskFormData.categoryId}
                            />
                          }
                        />

                        <UpdateTaskProjectModal
                          updateTaskProjectFormContainer={
                            <UpdateTaskProjectFormContainer
                              taskId={taskFormData.id}
                              projectId={taskFormData.projectId}
                            />
                          }
                        />

                        <UpdateTaskAssigneeModal
                          updateTaskAssigneeFormContainer={
                            <UpdateTaskAssigneeFormContainer
                              taskId={taskFormData.id}
                              assigneeId={taskFormData.assigneeId}
                            />
                          }
                        />

                        <TaskSearchModal
                          searchContainer={
                            <LinkSearchContainer pathname="/tasks" />
                          }
                        />

                        <CreateSubtaskModal taskId={taskFormData.id} />
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
