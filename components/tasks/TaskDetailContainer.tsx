"use client";

import useSWR from "swr";
import { TaskDetailSkeleton } from "./TaskDetail";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { SubtaskList } from "../subtasks/SubtaskList";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { SubtaskListItem } from "../subtasks/SubtaskListItem";
import { NewSubtaskModal } from "../subtasks/NewSubtaskModal";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { CreateSubtaskProvider } from "../subtasks/CreateSubtaskContext";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer({ taskId }: TaskDetailContainerProps) {
  const { data: task, error } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    revalidateOnFocus: false,
  });

  if (error) {
    if (error.status === 404) {
      throw new Error(undefined, { cause: "taskNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading
  if (!task) {
    return <TaskDetailSkeleton />;
  }

  return (
    <CreateSubtaskProvider taskId={task.id} createSubtask={createSubtask}>
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
      />

      <NewSubtaskModal taskId={task.id} />
    </CreateSubtaskProvider>
  );
}
