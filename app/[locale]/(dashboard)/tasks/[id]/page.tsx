import { notFound } from "next/navigation";
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

  const { id } = await params;
  const numberId = Number(id);

  const taskSummary = await getTaskSummary(numberId);

  if (!taskSummary) {
    notFound();
  }

  const guestMode = await hasGuestRole();

  return (
    <TaskDetailPage
      taskDetailContainer={<TaskDetailAltContainer taskId={numberId} />}
      taskHeaderContainer={<TaskDetailHeaderContainer taskId={numberId} />}
      taskDetailActions={
        <TaskDetailActions
          guestMode={guestMode}
          editTaskFormContainer={<EditTaskFormContainer taskId={numberId} />}
          taskId={numberId}
          taskTitle={taskSummary.title}
          deleteTask={deleteTasks}
          commentsModal={
            <TaskCommentsModal
              taskId={numberId}
              taskCommentsContainer={
                <TaskCommentsContainer
                  guestMode={guestMode}
                  taskId={numberId}
                />
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
