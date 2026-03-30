import "server-only";

import {
  AssignedTasksSection,
  AssignedTasksPresentation,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { Suspense } from "react";
import { TaskGridMobile } from "../TaskGrid";
import { TaskListSkeleton } from "../TaskList";
import { TaskGridItemMobile } from "../TaskGridItem";
import { AssignedTaskList } from "../AssignedTaskList";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { AssignedTaskListItem } from "../AssignedTaskListItem";

interface AssignedTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function AssignedTasksContainer(props: AssignedTasksContainerProps) {
  return (
    <Suspense
      fallback={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskListSkeleton items={10} showCheckbox={false} />
        </AssignedTasksSection>
      }
    >
      <AssignedTasksContainerInner {...props} />
    </Suspense>
  );
}

async function AssignedTasksContainerInner({
  tasks,
  totalCount,
  page,
  pageSize,
}: AssignedTasksContainerProps) {
  const getTaskCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
  });

  return (
    <AssignedTasksPresentation
      totalCount={totalCount}
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      listLarge={
        <AssignedTaskList>
          {tasks.map((task) => (
            <AssignedTaskListItem
              key={task.id}
              {...getTaskCommonProps(task)}
              project={task.project}
              category={task.category}
            />
          ))}
        </AssignedTaskList>
      }
      gridMobile={
        <TaskGridMobile>
          {tasks.map((task) => (
            <TaskGridItemMobile
              key={task.id}
              {...getTaskCommonProps(task)}
              subtasksTotal={task.subtasks.total}
              subtasksDone={task.subtasks.done}
            />
          ))}
        </TaskGridMobile>
      }
    />
  );
}
