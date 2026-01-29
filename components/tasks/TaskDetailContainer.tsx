"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { TaskDetailSkeleton } from "./TaskDetail/TaskDetailSkeleton";
import { NewSubtaskModalTrigger } from "../subtasks/NewSubtaskModalTrigger";
import { NewSubtaskBottomSheetTrigger } from "../subtasks/NewSubtaskBottomSheetTrigger";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer(props: TaskDetailContainerProps) {
  return (
    <Suspense fallback={<TaskDetailSkeleton />}>
      <TaskDetailContainerInner {...props} />
    </Suspense>
  );
}

function TaskDetailContainerInner({ taskId }: TaskDetailContainerProps) {
  const { data: task, mutate } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    suspense: true,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const newSubtaskForm = (
    <NewSubtaskForm
      taskId={task.id}
      formAction={createSubtask}
      mutate={mutate}
    />
  );

  return (
    <TaskDetail
      id={task.id}
      title={task.title}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description ?? undefined}
      category={task.category}
      project={task.project}
      status={task.status}
      subtasks={task.subtasks}
      attachments={task.attachments}
      newSubtaskBottomSheetTrigger={
        <NewSubtaskBottomSheetTrigger
          newSubtaskFormContainer={newSubtaskForm}
        />
      }
      newSubtaskModalTrigger={
        <NewSubtaskModalTrigger newSubtaskFormContainer={newSubtaskForm} />
      }
    />
  );
}
