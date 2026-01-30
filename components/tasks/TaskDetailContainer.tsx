"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { EditSubtaskForm } from "../subtasks/EditSubtaskForm";
import { SubtasksCheckbox } from "../subtasks/SubtasksCheckbox";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { TaskDetailSkeleton } from "./TaskDetail/TaskDetailSkeleton";
import { SubtasksCheckboxGroup } from "../subtasks/SubtasksCheckboxGroup";
import { NewSubtaskModalTrigger } from "../subtasks/NewSubtaskModalTrigger";
import { SubtaskActionMenuTrigger } from "../subtasks/SubtaskActionMenuTrigger";

interface TaskDetailContainerProps {
  taskId: number;
  guestMode: boolean;
}

export function TaskDetailContainer(props: TaskDetailContainerProps) {
  return (
    <Suspense fallback={<TaskDetailSkeleton />}>
      <TaskDetailContainerInner {...props} />
    </Suspense>
  );
}

function TaskDetailContainerInner({
  taskId,
  guestMode,
}: TaskDetailContainerProps) {
  const { data: task, mutate } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    suspense: true,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return (
    <TaskDetail
      id={task.id}
      title={task.title}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description}
      category={task.category}
      status={task.status}
      project={task.project}
      attachments={task.attachments}
      subtasksCheckboxGroup={
        task.subtasks.length && (
          <SubtasksCheckboxGroup
            defaultValue={task.subtasks
              .filter((subtask) => subtask.isDone)
              .map((subtask) => subtask.id.toString())}
          >
            {task.subtasks.map((subtask) => (
              <SubtasksCheckbox
                key={subtask.id}
                value={subtask.id.toString()}
                actionMenuTrigger={
                  <SubtaskActionMenuTrigger
                    guestMode={guestMode}
                    subtaskId={subtask.id}
                    subtaskText={subtask.text}
                    deleteAction={deleteSubtask}
                    editSubtaskForm={
                      <EditSubtaskForm
                        taskId={task.id}
                        subtaskId={subtask.id}
                        formAction={updateSubtask}
                        subtaskTextDefaultValue={subtask.text}
                        mutate={mutate}
                      />
                    }
                  />
                }
              >
                {subtask.text}
              </SubtasksCheckbox>
            ))}
          </SubtasksCheckboxGroup>
        )
      }
      newSubtaskModalTrigger={
        <NewSubtaskModalTrigger
          newSubtaskForm={
            <NewSubtaskForm
              taskId={task.id}
              formAction={createSubtask}
              mutate={mutate}
            />
          }
        />
      }
    />
  );
}
