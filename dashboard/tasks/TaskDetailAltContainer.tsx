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
import { ModalManagerProvider } from "../../common/ModalManagerContext";
import { DeleteSubtaskProvider } from "../subtasks/DeleteSubtaskProvider";
import { UpdateSubtaskProvider } from "../subtasks/UpdateSubtaskProvider";
import { ToggleSubtaskProvider } from "../subtasks/ToggleSubtaskProvider";

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

  const totalCount = task.subtasks.length;
  const doneCount = task.subtasks.filter((s) => s.isDone).length;

  return (
    <TaskDetailAlt
      title={task.title}
      creator={task.creator}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description}
      category={task.category}
      project={task.project}
      status={task.status}
      progress={totalCount ? (doneCount / totalCount) * 100 : 0}
      subtasksList={
        task.subtasks.length ? (
          <SubtaskList>
            {task.subtasks.map((subtask) => (
              <ModalManagerProvider key={subtask.id}>
                <DeleteSubtaskProvider>
                  <UpdateSubtaskProvider>
                    <ToggleSubtaskProvider>
                      <SubtaskListItem
                        id={subtask.id}
                        text={subtask.text}
                        isDone={subtask.isDone}
                        variant="rich"
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
                    </ToggleSubtaskProvider>
                  </UpdateSubtaskProvider>
                </DeleteSubtaskProvider>
              </ModalManagerProvider>
            ))}
          </SubtaskList>
        ) : undefined
      }
    />
  );
}
