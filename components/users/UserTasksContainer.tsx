import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { UserTaskList } from "./UserTaskList";
import { UserTaskListItem } from "./UserTaskListItem";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
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
              deleteTask={deleteTask}
              commentsCount={task.commentsCount}
              taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
              taskCommentsContainer={<TaskCommentsContainer taskId={task.id} />}
              editTaskFormContainer={<EditTaskFormContainer taskId={task.id} />}
              updateTaskStatus={updateTaskStatus}
              sendComment={sendComment}
              updateComment={updateComment}
              updateTask={updateTask}
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
