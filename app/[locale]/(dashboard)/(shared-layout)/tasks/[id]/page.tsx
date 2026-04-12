import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskFormData } from "@/lib/data/task/task.dal";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider";
import { SubtasksContainer } from "@/components/subtasks/SubtasksContainer";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { CreateSubtaskModal } from "@/components/subtasks/CreateSubtaskModal";
import { UpdateTaskTitleModal } from "@/components/tasks/UpdateTaskTitleModal";
import { DeleteTaskDetailModal } from "@/components/tasks/DeleteTaskDetailModal";
import { UpdateTaskStatusModal } from "@/components/tasks/UpdateTaskStatusModal";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { UpdateTaskProjectModal } from "@/components/tasks/UpdateTaskProjectModal";
import { UpdateTaskTitleProvider } from "@/components/tasks/UpdateTaskTitleProvider";
import { UpdateTaskAssigneeModal } from "@/components/tasks/UpdateTaskAssigneeModal";
import { UpdateTaskDeadlineModal } from "@/components/tasks/UpdateTaskDeadlineModal";
import { CreateSubtaskAltProvider } from "@/components/subtasks/CreateSubtaskProvider";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";
import { UpdateTaskProjectProvider } from "@/components/tasks/UpdateTaskProjectProvider";
import { UpdateTaskDescriptionModal } from "@/components/tasks/UpdateTaskDescriptionModal";
import { UpdateTaskDeadlineProvider } from "@/components/tasks/UpdateTaskDeadlineProvider";
import { UpdateTaskAssigneeProvider } from "@/components/tasks/UpdateTaskAssigneeProvider";
import { UpdateTaskStatusAltProvider } from "@/components/tasks/UpdateTaskStatusAltProvider";
import { UpdateTaskDescriptionProvider } from "@/components/tasks/UpdateTaskDescriptionProvider";
import { UpdateTaskCategoryForTaskModal } from "@/components/tasks/UpdateTaskCategoryForTaskModal";
import { UpdateTaskProjectFormContainer } from "@/components/tasks/UpdateTaskProjectFormContainer";
import { UpdateTaskAssigneeFormContainer } from "@/components/tasks/UpdateTaskAssigneeFormContainer";
import { UpdateTaskCategoryForTaskProvider } from "@/components/tasks/UpdateTaskCategoryForTaskProvider";
import { UpdateTaskCategoryForTaskFormContainer } from "@/components/tasks/UpdateTaskCategoryForTaskFormContainer";

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
    <CreateSubtaskAltProvider>
      <DeleteTaskProvider>
        <UpdateTaskStatusProvider>
          <UpdateTaskTitleProvider>
            <UpdateTaskDescriptionProvider>
              <UpdateTaskDeadlineProvider>
                <UpdateTaskStatusAltProvider>
                  <UpdateTaskAssigneeProvider>
                    <UpdateTaskCategoryForTaskProvider>
                      <UpdateTaskProjectProvider>
                        <TaskDetailPage
                          subtasksContainer={<SubtasksContainer taskId={id} />}
                          taskDetailContainer={
                            <TaskDetailAltContainer taskId={id} />
                          }
                          taskHeaderContainer={
                            <TaskDetailHeaderContainer taskId={id} />
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

                        <UpdateTaskCategoryForTaskModal
                          updateTaskCategoryForTaskFormContainer={
                            <UpdateTaskCategoryForTaskFormContainer
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
                    </UpdateTaskCategoryForTaskProvider>
                  </UpdateTaskAssigneeProvider>
                </UpdateTaskStatusAltProvider>
              </UpdateTaskDeadlineProvider>
            </UpdateTaskDescriptionProvider>
          </UpdateTaskTitleProvider>
        </UpdateTaskStatusProvider>
      </DeleteTaskProvider>
    </CreateSubtaskAltProvider>
  );
}
