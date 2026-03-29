"use client";

import { TaskList } from "./TaskList";
import { TaskListItem } from "./TaskListItem";
import { TaskItemWrapper } from "./TaskItemWrapper";
import { TaskGridLarge, TaskGridMobile } from "./TaskGrid";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { TaskGridItemLarge, TaskGridItemMobile } from "./TaskGridItem";
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
  const renderListLarge = () => {
    return (
      <TaskList>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <TaskListItem {...task} showCheckbox />
            </TaskItemWrapper>
          );
        })}
      </TaskList>
    );
  };

  const renderGridLarge = () => {
    return (
      <TaskGridLarge>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <TaskGridItemLarge
                {...task}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
            </TaskItemWrapper>
          );
        })}
      </TaskGridLarge>
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
