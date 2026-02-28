import { notFound } from "next/navigation";
import { taskId } from "@/lib/schemas/task";
import { TaskDetailPage } from "./TaskDetailPage";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { getTaskSummary } from "@/lib/data/task/task.dal";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
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
  const session = await requireProtectedPage();

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

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <TaskDetailPage
        taskDetailContainer={<TaskDetailAltContainer taskId={id} />}
        taskHeaderContainer={<TaskDetailHeaderContainer taskId={id} />}
        editTaskFormContainer={<EditTaskFormContainer taskId={id} />}
        taskId={id}
        taskTitle={taskSummary.title}
        deleteTask={deleteTasks}
        taskCommentsContainer={<TaskCommentsContainer taskId={id} />}
        sendComment={sendComment}
        updateComment={updateComment}
        appHeaderProps={defaultAppHeaderSlots}
      />
    </CurrentUserProvider>
  );
}
