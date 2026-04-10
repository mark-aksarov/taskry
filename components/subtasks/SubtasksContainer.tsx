import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SubtaskListItem } from "./SubtaskListItem";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { UpdateSubtaskModal } from "./UpdateSubtaskModal";
import { DeleteSubtaskModal } from "./DeleteSubtaskModal";
import { SubtaskList, SubtaskListSkeleton } from "./SubtaskList";
import { DeleteSubtaskAltProvider } from "./DeleteSubtaskProvider";
import { UpdateSubtaskAltProvider } from "./UpdateSubtaskProvider";
import { ToggleSubtaskAltProvider } from "./ToggleSubtaskProvider";
import { ModalManagerProvider } from "../common/ModalManagerContext";

interface SubtasksContainerProps {
  taskId: number;
}

export function SubtasksContainer(props: SubtasksContainerProps) {
  return (
    <Suspense fallback={<SubtaskListSkeleton />}>
      <SubtasksContainerInner {...props} />
    </Suspense>
  );
}

async function SubtasksContainerInner({ taskId }: SubtasksContainerProps) {
  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  if (!task.subtasks.length) {
    return null;
  }

  return (
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
  );
}
