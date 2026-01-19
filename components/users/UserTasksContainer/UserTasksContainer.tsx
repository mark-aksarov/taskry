import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
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
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                  sendCommentAction={sendComment}
                />
              }
              menuTrigger={
                <TaskItemActionMenuTrigger
                  taskId={task.id}
                  taskTitle={task.title}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                  taskStatus={task.status}
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
