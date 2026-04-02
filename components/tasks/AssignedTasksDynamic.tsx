"use client";

import { TaskGridMobile } from "./TaskGrid";
import { TaskItemWrapper } from "./TaskItemWrapper";
import { AssignedTaskList } from "./AssignedTaskList";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { AssignedTaskListItem } from "./AssignedTaskListItem";
import { AssignedTaskGridItemMobile } from "./AssignedTaskGridItemMobile";
import { AssignedTasksPresentation } from "./AssignedTasksPresentation";

interface AssignedTasksDynamicProps {
  tasks: TaskListItemDTO[];
  totalPages: number;
  page: number;
  pageSize: number;
}

export function AssignedTasksDynamic({
  tasks,
  totalPages,
  page,
  pageSize,
}: AssignedTasksDynamicProps) {
  const renderListLarge = () => {
    return (
      <AssignedTaskList>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <AssignedTaskListItem {...task} />
            </TaskItemWrapper>
          );
        })}
      </AssignedTaskList>
    );
  };

  const renderGridMobile = () => {
    return (
      <TaskGridMobile>
        {tasks.map((task) => {
          return (
            <TaskItemWrapper key={task.id} task={task}>
              <AssignedTaskGridItemMobile
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
    <AssignedTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={totalPages}
      listLarge={renderListLarge}
      gridMobile={renderGridMobile}
    />
  );
}
