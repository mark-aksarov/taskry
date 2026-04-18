"use client";

import useSWR from "swr";
import { TaskDetailSkeleton } from "./TaskDetail";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { SubtaskListItemInner } from "../subtasks/SubtaskListItem";
import { CreateSubtaskModal } from "../subtasks/CreateSubtaskModal";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer({ taskId }: TaskDetailContainerProps) {
  const { data: task, error } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`);

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!task) {
    return <TaskDetailSkeleton />;
  }

  return (
    <>
      <TaskDetail
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
                <SubtaskListItemInner
                  key={subtask.id}
                  id={subtask.id}
                  text={subtask.text}
                  isDone={subtask.isDone}
                  showActionMenu={false}
                />
              ))}
            </SubtaskList>
          ) : undefined
        }
      />

      <CreateSubtaskModal taskId={taskId} />
    </>
  );
}
