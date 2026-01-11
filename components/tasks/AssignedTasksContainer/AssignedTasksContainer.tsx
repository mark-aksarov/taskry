import {
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "@/lib/data/user/user.dal";

import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
  AssignedTasksPresentation,
} from "../AssignedTasks";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";

interface AssignedTasksContainerProps {
  guestMode?: boolean;
  page: number;
  pageSize: number;
  newTaskFormContainer: React.ReactNode;
}

export async function AssignedTasksContainer({
  guestMode,
  page,
  pageSize,
  newTaskFormContainer,
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
        <AssignedTasksEmptyCard newTaskFormContainer={newTaskFormContainer} />
      </AssignedTasksSection>
    );
  }

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
    <AssignedTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(count / pageSize)}
      list={
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
              menuTrigger={
                <TaskItemActionMenuTrigger
                  guestMode={guestMode}
                  taskId={task.id}
                  taskTitle={task.title}
                  taskStatus={task.status}
                  projectStatus={task.project.status}
                  canDelete={canDelete}
                  canUpdate={canUpdate}
                  canUpdateStatus={task.canUpdateStatus}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                />
              }
            />
          ))}
        </TaskList>
      }
    />
  );
}
