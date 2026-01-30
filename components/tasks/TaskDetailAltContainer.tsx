import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { EditSubtaskForm } from "../subtasks/EditSubtaskForm";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { SubtasksCheckbox } from "../subtasks/SubtasksCheckbox";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { SubtasksCheckboxGroup } from "../subtasks/SubtasksCheckboxGroup";
import { NewSubtaskModalTrigger } from "../subtasks/NewSubtaskModalTrigger";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt/TaskDetailAltSkeleton";
import { SubtaskActionMenuTrigger } from "../subtasks/SubtaskActionMenuTrigger";

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

  const guestMode = await hasGuestRole();

  return (
    <TaskDetailAlt
      id={task.id}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description ?? undefined}
      category={task.category}
      project={task.project}
      status={task.status}
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
            <NewSubtaskForm taskId={task.id} formAction={createSubtask} />
          }
        />
      }
    />
  );
}
