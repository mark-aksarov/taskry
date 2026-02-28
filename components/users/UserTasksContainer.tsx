import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "./UserTaskList";
import { UserTaskListItem } from "./UserTaskListItem";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
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
              deleteTask={deleteTasks}
              commentsCount={task.commentsCount}
              taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
              taskCommentsContainer={<TaskCommentsContainer taskId={task.id} />}
              editTaskFormContainer={<EditTaskFormContainer taskId={task.id} />}
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
  );
}
