"use client";

import { UserTaskList } from "./UserTaskList";
import { TaskGridMobile } from "../tasks/TaskGrid";
import { UserTaskListItem } from "./UserTaskListItem";
import { TaskItemWrapper } from "../tasks/TaskItemWrapper";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { TaskGridItemMobile } from "../tasks/TaskGridItem";
import { UserTasksPresentation } from "./UserTasksPresentation";

interface UserTasksDynamicProps {
  tasks: TaskListItemDTO[];
  totalPages: number;
  page: number;
  pageSize: number;
}

export function UserTasksDynamic({
  tasks,
  totalPages,
  page,
  pageSize,
}: UserTasksDynamicProps) {
  const renderListLarge = () => {
    return (
      <UserTaskList>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <UserTaskListItem {...task} />
            </TaskItemWrapper>
          );
        })}
      </UserTaskList>
    );
  };

  const renderGridMobile = () => {
    return (
      <TaskGridMobile>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <TaskGridItemMobile
                {...task}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
            </TaskItemWrapper>
          );
        })}
      </TaskGridMobile>
    );
  };

  return (
    <UserTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridMobile={renderGridMobile}
    />
  );
}
