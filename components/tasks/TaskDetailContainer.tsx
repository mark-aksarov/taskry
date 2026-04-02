"use client";

import useSWR from "swr";
import { TaskDetailSkeleton } from "./TaskDetail";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { UpdateSubtaskModal } from "../subtasks/UpdateSubtaskModal";
import { DeleteSubtaskModal } from "../subtasks/DeleteSubtaskModal";
import { CreateSubtaskModal } from "../subtasks/CreateSubtaskModal";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { CreateSubtaskProvider } from "../subtasks/CreateSubtaskProvider";
import { DeleteSubtaskProvider } from "../subtasks/DeleteSubtaskProvider";
import { UpdateSubtaskProvider } from "../subtasks/UpdateSubtaskProvider";
import { ToggleSubtaskProvider } from "../subtasks/ToggleSubtaskProvider";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer({ taskId }: TaskDetailContainerProps) {
  const { data: task, error } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    revalidateOnFocus: false,
  });

  if (error) {
    throw new Error();
  }

  // Show skeleton while loading
  if (!task) {
    return <TaskDetailSkeleton />;
  }

  return (
    <CreateSubtaskProvider taskId={taskId}>
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
          task.subtasks.length ? (
            <SubtaskList>
              {task.subtasks.map((subtask) => (
                <ModalManagerProvider key={subtask.id}>
                  <DeleteSubtaskProvider taskId={task.id}>
                    <UpdateSubtaskProvider taskId={task.id}>
                      <ToggleSubtaskProvider taskId={task.id}>
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
                      </ToggleSubtaskProvider>
                    </UpdateSubtaskProvider>
                  </DeleteSubtaskProvider>
                </ModalManagerProvider>
              ))}
            </SubtaskList>
          ) : undefined
        }
      />

      <CreateSubtaskModal taskId={taskId} />
    </CreateSubtaskProvider>
  );
}
