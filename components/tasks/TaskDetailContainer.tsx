"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { EditSubtaskForm } from "../subtasks/EditSubtaskForm";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { TaskDetailSkeleton } from "./TaskDetail/TaskDetailSkeleton";
import { DeleteSubtaskModalProvider } from "../subtasks/DeleteSubtaskModal";
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
      creator={task.creator}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description}
      category={task.category}
      status={task.status}
      project={task.project}
      subtasksList={
        task.subtasks.length !== 0 && (
          <DeleteSubtaskModalProvider
            deleteEntity={deleteSubtask}
            mutate={mutate}
          >
            <SubtaskList>
              {task.subtasks.map((subtask) => (
                <SubtaskListItem
                  key={subtask.id}
                  isDone={subtask.isDone}
                  actionMenuTrigger={
                    <SubtaskActionMenuTrigger
                      guestMode={guestMode}
                      subtaskId={subtask.id}
                      isDone={subtask.isDone}
                      subtaskText={subtask.text}
                      toggleSubtask={toggleSubtask}
                      mutate={mutate}
                      editSubtaskForm={
                        <EditSubtaskForm
                          taskId={task.id}
                          subtaskId={subtask.id}
                          updateSubtask={updateSubtask}
                          textDefaultValue={subtask.text}
                          mutate={mutate}
                        />
                      }
                    />
                  }
                />
              ))}
            </SubtaskList>
          </DeleteSubtaskModalProvider>
        )
      }
      newSubtaskModalTrigger={
        <NewSubtaskModalTrigger
          newSubtaskForm={
            <NewSubtaskForm
              taskId={task.id}
              createSubtask={createSubtask}
              mutate={mutate}
            />
          }
        />
      }
    />
  );
}
