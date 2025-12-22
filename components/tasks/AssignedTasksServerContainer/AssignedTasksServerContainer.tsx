import {
  AssignedTasksSection,
  AssignedTasksEmptyCard,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { getTaskCount, getTaskList } from "@/lib/dal/task";
import { Pagination } from "@/components/common/Pagination";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";

interface AssignedTasksServerContainerProps {
  page: number;
  pageSize: number;
}

export async function AssignedTasksServerContainer({
  page,
  pageSize,
}: AssignedTasksServerContainerProps) {
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
        <AssignedTasksEmptyCard />
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

  return (
    <>
      <AssignedTasksSection>
        <AssignedTasksSectionHeading />
        <TaskList>
          {tasks.map((task) => (
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
