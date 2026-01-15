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
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
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

  const canDelete = await canDeleteTask();
  const canUpdate = await canUpdateTask();

  const tasksWithPermissions = await Promise.all(
    tasks.map(async (task) => {
      const canUpdateStatus = await canUpdateTaskStatus(task.assignee?.id);

      return {
        ...task,
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
              menuTrigger={
                <TaskItemActionMenuTrigger
                  taskId={task.id}
                  taskTitle={task.title}
                  canDelete={canDelete}
                  canUpdate={canUpdate}
                  canUpdateStatus={task.canUpdateStatus}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                  taskStatus={task.status}
                  projectStatus={task.project.status}
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
