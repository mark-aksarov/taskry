import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../UserTaskListItem";
import { Pagination } from "@/components/common/Pagination";
import { getTaskCount, getTaskList } from "@/lib/queries/task";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

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
  const workspaceId = await getUserWorkspaceId();
  const tasks = await getTaskList({
    page,
    pageSize,
    workspaceId,
    assigneeId: userId,
  });

  const count = await getTaskCount({ workspaceId, assigneeId: userId });
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
              comments={task._count.comments}
              status={{
                id: task.status.id,
                name: task.status.name,
              }}
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
