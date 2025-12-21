import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { getTaskCount, getTaskList } from "@/lib/dal/task";
import { Pagination } from "@/components/common/Pagination";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";

interface UserTasksServerContainerProps {
  page: number;
  pageSize: number;
  userId: string;
  baseUrl: string;
}

export async function UserTasksServerContainer({
  page,
  pageSize,
  userId,
  baseUrl,
}: UserTasksServerContainerProps) {
  const tasks = await getTaskList({
    page,
    pageSize,
    assigneeId: userId,
  });

  const count = await getTaskCount(userId);
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
