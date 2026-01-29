import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { NewSubtaskModalTrigger } from "../subtasks/NewSubtaskModalTrigger";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt/TaskDetailAltSkeleton";
import { NewSubtaskBottomSheetTrigger } from "../subtasks/NewSubtaskBottomSheetTrigger";

interface TaskDetailAltContainerProps {
  taskId: number;
}

export function TaskDetailAltContainer(props: TaskDetailAltContainerProps) {
  return (
    <Suspense fallback={<TaskDetailAltSkeleton />}>
      <TaskDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function TaskDetailAltContainerInner({
  taskId,
}: TaskDetailAltContainerProps) {
  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  const newSubtaskForm = (
    <NewSubtaskForm taskId={task.id} formAction={createSubtask} />
  );

  return (
    <TaskDetailAlt
      id={task.id}
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
