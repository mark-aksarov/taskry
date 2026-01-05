import {
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "@/lib/data/user/user.dal";

import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { getTaskList } from "@/lib/data/task/task.service";
import { Pagination } from "@/components/common/Pagination";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";

interface AssignedTasksContainerProps {
  page: number;
  pageSize: number;
  NewTaskFormContainer: React.ComponentType;
}

export async function AssignedTasksContainer({
  page,
  pageSize,
  NewTaskFormContainer,
}: AssignedTasksContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const assigneeId = session!.user.id;

  const filters = {
    status: [],
    category: [],
    project: [],
    assignee: [assigneeId],
  };

  const tasks = await getTaskList({
    page,
    pageSize,
    sort: "deadline",
    filters,
  });

  const count = await getTaskCount(filters);

  if (!count) {
    return (
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <AssignedTasksEmptyCard NewTaskFormContainer={NewTaskFormContainer} />
      </AssignedTasksSection>
    );
  }

  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/",
  };

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
    <>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <TaskList>
          {tasksWithPermissions.map((task) => (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              category={task.category}
              project={task.project}
              status={task.status}
              assignee={task.assignee}
              commentsCount={task.commentsCount}
              canDelete={task.canDelete}
              canUpdate={task.canUpdate}
              canUpdateStatus={task.canUpdateStatus}
              deleteAction={deleteTasks}
              updateStatusAction={updateTaskStatuses}
            />
          ))}
        </TaskList>
      </AssignedTasksSection>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
