import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "./UserTaskList";
import { UserTaskListItem } from "./UserTaskListItem";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
import { DeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";

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
                commentsCount={task.commentsCount}
                guestMode={guestMode}
                taskDetailContainer={
                  <TaskDetailContainer guestMode={guestMode} taskId={task.id} />
                }
                taskCommentsContainer={
                  <TaskCommentsContainer
                    guestMode={guestMode}
                    taskId={task.id}
                  />
                }
                editTaskFormContainer={
                  <EditTaskFormContainer taskId={task.id} />
                }
                updateTaskStatus={updateTaskStatuses}
                sendComment={sendComment}
                updateComment={updateComment}
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
