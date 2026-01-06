import {
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "@/lib/data/user/user.dal";

import {
  EntityContainerPagination,
  EntityPaginationProvider,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";

interface UserTasksContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  userId: string;
  baseUrl: string;
}

export async function UserTasksContainer({
  page,
  pageSize,
  sort,
  userId,
  baseUrl,
}: UserTasksContainerProps) {
  const filters = {
    status: [],
    category: [],
    project: [],
    assignee: [userId],
  };
  const tasks = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  const count = await getTaskCount(filters);

  const canDelete = await canDeleteTask();
  const canUpdate = await canUpdateTask();

  const tasksWithPermissions = await Promise.all(
    tasks.map(async (task) => {
      const canUpdateStatus = await canUpdateTaskStatus(task.assignee?.id);

      return {
        ...task,
        canDelete,
        canUpdate,
        canUpdateStatus,
      };
    }),
  );

  return (
    <EntityPaginationProvider>
      <UserTaskList>
        {tasksWithPermissions.length &&
          tasksWithPermissions.map((task) => (
            <UserTaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              commentsCount={task.commentsCount}
              status={task.status}
              projectStatus={task.project.status}
              canDelete={task.canDelete}
              canUpdate={task.canUpdate}
              canUpdateStatus={task.canUpdateStatus}
              deleteAction={deleteTasks}
              updateStatusAction={updateTaskStatuses}
            />
          ))}
      </UserTaskList>

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(count / pageSize)}
        pageSize={pageSize}
      />
    </EntityPaginationProvider>
  );
}
