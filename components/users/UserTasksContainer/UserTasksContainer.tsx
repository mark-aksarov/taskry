import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
import { DeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

interface UserTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function UserTasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: UserTasksContainerProps) {
  const guestMode = await hasGuestRole();

  return (
    <DeleteTaskModalProvider deleteEntity={deleteTasks}>
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
                updateTaskStatus={updateTaskStatuses}
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
                commentsCount={task.commentsCount}
                taskCommentsModal={
                  <TaskCommentsModal
                    taskId={task.id}
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
    </DeleteTaskModalProvider>
  );
}
