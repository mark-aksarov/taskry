"use client";

import { TaskList } from "./TaskList";
import { TaskListItem } from "./TaskListItem";
import { BaseTaskItemProps } from "./TaskItem";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskGridLarge, TaskGridMobile } from "./TaskGrid";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { TaskDetailContainer } from "./TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskCommentsContainer } from "./TaskCommentsContainer";
import { UpdateTaskFormContainer } from "./UpdateTaskFormContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { TaskGridItemLarge, TaskGridItemMobile } from "./TaskGridItem";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

interface TasksDynamicProps {
  tasks: TaskListItemDTO[];
  totalPages: number;
  page: number;
  pageSize: number;
}

export function TasksDynamic({
  tasks,
  totalPages,
  page,
  pageSize,
}: TasksDynamicProps) {
  const getCommonProps = (task: TaskListItemDTO): BaseTaskItemProps => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,

    taskCommentsContainer: <TaskCommentsContainer taskId={task.id} />,
    updateTaskFormContainer: <UpdateTaskFormContainer taskId={task.id} />,

    sendComment,
    updateComment,
    updateTask,
    deleteTask,
    updateTaskStatus,
  });

  const getCommonContainerProps = (task: TaskListItemDTO) => ({
    taskDetailContainer: <TaskDetailContainer taskId={task.id} />,

    userDetailContainer: task.assignee ? (
      <UserDetailContainer userId={task.assignee.id} />
    ) : undefined,

    userDetailHeaderContainer: task.assignee ? (
      <UserDetailHeaderContainer userId={task.assignee.id} />
    ) : undefined,
  });

  const renderListLarge = () => {
    return (
      <TaskList>
        {tasks.map((task) => {
          const common = getCommonProps(task);
          const commonContainers = getCommonContainerProps(task);

          return (
            <TaskListItem
              key={task.id}
              {...common}
              {...commonContainers}
              project={task.project}
              category={task.category}
              showCheckbox
              projectDetailContainer={
                task.project ? (
                  <ProjectDetailContainer projectId={task.project.id} />
                ) : undefined
              }
            />
          );
        })}
      </TaskList>
    );
  };

  const renderGridLarge = () => {
    return (
      <TaskGridLarge>
        {tasks.map((task) => {
          const common = getCommonProps(task);
          const commonContainers = getCommonContainerProps(task);

          return (
            <TaskGridItemLarge
              key={task.id}
              {...common}
              {...commonContainers}
              subtasksTotal={task.subtasks.total}
              subtasksDone={task.subtasks.done}
            />
          );
        })}
      </TaskGridLarge>
    );
  };

  const renderGridMobile = () => {
    return (
      <TaskGridMobile>
        {tasks.map((task) => {
          const common = getCommonProps(task);

          return (
            <TaskGridItemMobile
              key={task.id}
              {...common}
              subtasksTotal={task.subtasks.total}
              subtasksDone={task.subtasks.done}
            />
          );
        })}
      </TaskGridMobile>
    );
  };

  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridLarge={renderGridLarge}
      gridMobile={renderGridMobile}
    />
  );
}
