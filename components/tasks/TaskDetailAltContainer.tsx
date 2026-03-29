import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { UpdateSubtaskModal } from "../subtasks/UpdateSubtaskModal";
import { DeleteSubtaskModal } from "../subtasks/DeleteSubtaskModal";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { DeleteSubtaskAltProvider } from "../subtasks/DeleteSubtaskProvider";
import { UpdateSubtaskAltProvider } from "../subtasks/UpdateSubtaskProvider";
import { ToggleSubtaskAltProvider } from "../subtasks/ToggleSubtaskProvider";

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
              <ModalManagerProvider key={subtask.id}>
                <DeleteSubtaskAltProvider>
                  <UpdateSubtaskAltProvider>
                    <ToggleSubtaskAltProvider>
                      <SubtaskListItem
                        id={subtask.id}
                        text={subtask.text}
                        isDone={subtask.isDone}
                        taskId={task.id}
                      />

                      <UpdateSubtaskModal
                        taskId={task.id}
                        subtaskId={subtask.id}
                        subtaskText={subtask.text}
                      />

                      <DeleteSubtaskModal
                        subtaskId={subtask.id}
                        subtaskText={subtask.text}
                      />
                    </ToggleSubtaskAltProvider>
                  </UpdateSubtaskAltProvider>
                </DeleteSubtaskAltProvider>
              </ModalManagerProvider>
            ))}
          </SubtaskList>
        )
      }
    />
  );
}
