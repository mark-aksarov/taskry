import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";

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

  return (
    <TaskDetailAlt
      id={task.id}
      creator={task.creator}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description}
      category={task.category}
      project={task.project}
      status={task.status}
      subtasksList={
        task.subtasks.length !== 0 && (
          <SubtaskList>
            {task.subtasks.map((subtask) => (
              <SubtaskListItem
                key={subtask.id}
                id={subtask.id}
                text={subtask.text}
                isDone={subtask.isDone}
                taskId={task.id}
                toggleSubtask={toggleSubtask}
                updateSubtask={updateSubtask}
                deleteSubtask={deleteSubtask}
              />
            ))}
          </SubtaskList>
        )
      }
      createSubtask={createSubtask}
    />
  );
}
