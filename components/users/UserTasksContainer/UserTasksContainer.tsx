import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "../UserTaskList";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { UserTaskListItem } from "../UserTaskListItem";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

interface UserTasksContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  userId: string;
}

export async function UserTasksContainer({
  page,
  pageSize,
  sort,
  userId,
}: UserTasksContainerProps) {
  const filters = {
    status: [],
    category: [],
    project: [],
    assignee: [userId],
  };
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  const guestMode = await hasGuestRole();

  return (
    <EntityPaginationProvider>
      <UserTaskList>
        {tasks.length &&
          tasks.map((task) => (
            <UserTaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              status={task.status}
              taskDetailModal={
                <TaskDetailModal
                  taskId={task.id}
                  taskDetailContainer={
                    <TaskDetailContainer
                      guestMode={guestMode}
                      taskId={task.id}
                    />
                  }
                />
              }
              taskDetailBottomSheet={
                <TaskDetailBottomSheet
                  taskId={task.id}
                  taskDetailContainer={
                    <TaskDetailContainer
                      guestMode={guestMode}
                      taskId={task.id}
                    />
                  }
                />
              }
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                  taskCommentsContainer={
                    <TaskCommentsContainer
                      guestMode={guestMode}
                      taskId={task.id}
                    />
                  }
                  sendCommentAction={sendComment}
                  updateCommentAction={updateComment}
                />
              }
              menuTrigger={
                <TaskItemActionMenuTrigger
                  guestMode={guestMode}
                  taskId={task.id}
                  taskTitle={task.title}
                  taskStatus={task.status}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                  editTaskFormContainer={
                    <EditTaskFormContainer taskId={task.id} />
                  }
                />
              }
            />
          ))}
      </UserTaskList>

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(totalCount / pageSize)}
        pageSize={pageSize}
        className="my-4"
      />
    </EntityPaginationProvider>
  );
}
