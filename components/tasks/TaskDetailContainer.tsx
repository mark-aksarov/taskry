"use client";

import useSWR from "swr";
import { TaskDetailSkeleton } from "./TaskDetail";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { TaskDetailProviders } from "./TaskDetailProviders";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { SubtaskProviders } from "../subtasks/SubtaskProviders";
import { CreateSubtaskModal } from "../subtasks/CreateSubtaskModal";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer({ taskId }: TaskDetailContainerProps) {
  const { data: task, error } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    revalidateOnFocus: false,
  });

  if (error) {
    if (error.status === 404) {
      throw new Error(undefined, { cause: "taskNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading
  if (!task) {
    return <TaskDetailSkeleton />;
  }

  return (
    <TaskDetailProviders taskId={task.id}>
      <TaskDetail
        id={task.id}
        title={task.title}
        creator={task.creator}
        assignee={task.assignee}
        deadline={task.deadline}
        description={task.description}
        category={task.category}
        status={task.status}
        project={task.project}
        subtasksList={
          task.subtasks.length ? (
            <SubtaskList>
              {task.subtasks.map((subtask) => (
                <SubtaskProviders key={subtask.id} taskId={task.id}>
                  <SubtaskListItem
                    id={subtask.id}
                    text={subtask.text}
                    isDone={subtask.isDone}
                    taskId={task.id}
                  />
                </SubtaskProviders>
              ))}
            </SubtaskList>
          ) : undefined
        }
      />

      <CreateSubtaskModal taskId={task.id} />
    </TaskDetailProviders>
  );
}
