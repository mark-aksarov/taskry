import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTask } from "@/lib/data/task/task.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LinkSearchContainer } from "@/dashboard/common/LinkSearchContainer";
import { TaskDetailAltContainer } from "@/dashboard/tasks/TaskDetailAltContainer";
import { TaskDetailCardHeaderContainer } from "@/dashboard/tasks/TaskDetailCardHeaderContainer";
import { UpdateTaskProjectFormContainer } from "@/dashboard/tasks/UpdateTaskProjectFormContainer";
import { UpdateTaskAssigneeFormContainer } from "@/dashboard/tasks/UpdateTaskAssigneeFormContainer";
import { UpdateTaskCategoryRelFormContainer } from "@/dashboard/tasks/UpdateTaskCategoryRelFormContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireFullAccess();

  // Validation
  const { id: rawTaskId } = await params;

  const parsed = taskId.safeParse(rawTaskId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  // Get task data
  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <TaskDetailPage
      task={task}
      taskDetailCardHeaderContainer={
        <TaskDetailCardHeaderContainer taskId={id} />
      }
      taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
      updateTaskCategoryRelFormContainer={
        <UpdateTaskCategoryRelFormContainer
          taskId={task.id}
          categoryId={task.categoryId}
        />
      }
      updateTaskProjectFormContainer={
        <UpdateTaskProjectFormContainer
          taskId={task.id}
          projectId={task.projectId}
        />
      }
      updateTaskAssigneeFormContainer={
        <UpdateTaskAssigneeFormContainer
          taskId={task.id}
          assigneeId={task.assigneeId}
        />
      }
      searchContainer={<LinkSearchContainer pathname="/tasks" />}
    />
  );
}
