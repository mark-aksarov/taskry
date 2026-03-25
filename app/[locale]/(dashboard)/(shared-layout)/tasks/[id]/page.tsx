import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { updateTask } from "@/lib/actions/task/updateTask";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UpdateTaskProvider } from "@/components/tasks/UpdateTaskContext";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskContext";
import { LinkSearchContainer } from "@/components/common/LinkSearchContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { UpdateTaskFormContainer } from "@/components/tasks/UpdateTaskFormContainer";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";

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
  const taskSummary = await getTaskSummary(id);

  if (!taskSummary) {
    notFound();
  }

  return (
    <UpdateTaskProvider updateTask={updateTask}>
      <DeleteTaskProvider deleteTask={deleteTask}>
        <TaskDetailPage
          taskId={id}
          taskTitle={taskSummary.title}
          sendComment={sendComment}
          updateComment={updateComment}
          searchContainer={<LinkSearchContainer pathname="/tasks" />}
          taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
          taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
          updateTaskFormContainer={<UpdateTaskFormContainer taskId={id} />}
          taskCommentsContainer={<TaskCommentsContainer taskId={id} />}
        />
      </DeleteTaskProvider>
    </UpdateTaskProvider>
  );
}
