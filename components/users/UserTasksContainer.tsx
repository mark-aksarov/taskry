import "server-only";

import { UserTaskList } from "./UserTaskList";
import { TaskGridMobile } from "../tasks/TaskGrid";
import { BaseTaskItemProps } from "../tasks/TaskItem";
import { UserTaskListItem } from "./UserTaskListItem";
import { TaskGridItemMobile } from "../tasks/TaskGridItem";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { UserTasksPresentation } from "./UserTasksPresentation";
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
  const getCommonProps = (task: TaskListItemDTO): BaseTaskItemProps => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,

    taskCommentsContainer: <TaskCommentsContainer taskId={task.id} />,
    editTaskFormContainer: <EditTaskFormContainer taskId={task.id} />,

    sendComment,
    updateComment,
    updateTask,
    deleteTask,
    updateTaskStatus,
  });

  return (
    <UserTasksPresentation
      page={page}
      pageSize={pageSize}
      listLarge={
        <UserTaskList>
          {tasks.map((task) => (
            <UserTaskListItem
              key={task.id}
              {...getCommonProps(task)}
              taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
            />
          ))}
        </UserTaskList>
      }
      gridMobile={
        <TaskGridMobile>
          {tasks.map((task) => (
            <TaskGridItemMobile
              key={task.id}
              {...getCommonProps(task)}
              subtasksTotal={task.subtasks.total}
              subtasksDone={task.subtasks.done}
            />
          ))}
        </TaskGridMobile>
      }
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
