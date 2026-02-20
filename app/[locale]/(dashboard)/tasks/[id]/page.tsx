import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskDetailAltContainer } from "@/components/tasks/TaskDetailAltContainer";
import { TaskDetailHeaderContainer } from "@/components/tasks/TaskDetailHeaderContainer";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id: rawTaskId } = await params;

  const parsed = taskId.safeParse(rawTaskId);
  if (!parsed.success) {
    notFound();
  }
  const id = parsed.data;

  const taskSummary = await getTaskSummary(id);

  if (!taskSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <TaskDetailPage
      taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
      taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
      taskDetailActions={
        <TaskDetailActions
          guestMode={guestMode}
          editTaskFormContainer={<EditTaskFormContainer taskId={id} />}
          taskId={id}
          taskTitle={taskSummary.title}
          deleteTask={deleteTasks}
          commentsModal={
            <TaskCommentsModal
              taskId={id}
              taskCommentsContainer={
                <TaskCommentsContainer guestMode={guestMode} taskId={id} />
              }
              sendCommentAction={sendComment}
              updateCommentAction={updateComment}
            />
          }
        />
      }
      appHeaderProps={defaultAppHeaderSlots}
    />
  );
}
