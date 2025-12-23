import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { Pagination } from "@/components/common/Pagination";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";

interface UserTasksServerContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  userId: string;
  baseUrl: string;
}

export async function UserTasksServerContainer({
  page,
  pageSize,
  sort,
  userId,
  baseUrl,
}: UserTasksServerContainerProps) {
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
  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl,
  };

  return (
    <>
      <UserTaskList>
        {tasks.length &&
          tasks.map((task) => (
            <UserTaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              commentsCount={task.commentsCount}
              status={task.status}
              projectStatus={task.project.status}
              deleteAction={deleteTasks}
              updateStatusAction={updateTaskStatuses}
            />
          ))}
      </UserTaskList>

      {totalPages > 1 && (
        <div className="flex justify-center py-4">
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
