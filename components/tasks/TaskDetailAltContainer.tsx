import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SubtaskList } from "../subtasks/SubtaskList";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { NewSubtaskForm } from "../subtasks/NewSubtaskForm";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { EditSubtaskForm } from "../subtasks/EditSubtaskForm";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { NewSubtaskModalTrigger } from "../subtasks/NewSubtaskModalTrigger";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt/TaskDetailAltSkeleton";
import { SubtaskActionMenuTrigger } from "../subtasks/SubtaskActionMenuTrigger";
import { DeleteSubtaskModalProvider } from "../subtasks/DeleteSubtaskModal";

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
      description={task.description}
      category={task.category}
      project={task.project}
      status={task.status}
      subtasksList={
        task.subtasks.length !== 0 && (
          <DeleteSubtaskModalProvider deleteEntity={deleteSubtask}>
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
                      editSubtaskForm={
                        <EditSubtaskForm
                          taskId={task.id}
                          subtaskId={subtask.id}
                          updateSubtask={updateSubtask}
                          textDefaultValue={subtask.text}
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
            <NewSubtaskForm taskId={task.id} createSubtask={createSubtask} />
          }
        />
      }
    />
  );
}
