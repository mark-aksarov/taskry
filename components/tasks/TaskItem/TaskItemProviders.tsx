import {
  ActionFn,
  ActionState,
  DeleteTaskPayload,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import { UpdateTaskProvider } from "../UpdateTaskContext";
import { DeleteTaskProvider } from "../DeleteTaskContext";
import { TaskItemPendingOverlay } from "./TaskItemPendingOverlay";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";

interface TaskItemProvidersProps {
  taskId: number;
  updateTask: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
  children: React.ReactNode;
}

export function TaskItemProviders({
  taskId,
  updateTask,
  deleteTask,
  updateTaskStatus,
  children,
}: TaskItemProvidersProps) {
  return (
    <UpdateTaskProvider updateTask={updateTask}>
      <DeleteTaskProvider deleteTask={deleteTask}>
        <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
          <TaskItemPendingOverlay taskId={taskId}>
            {children}
          </TaskItemPendingOverlay>
        </UpdateTaskStatusProvider>
      </DeleteTaskProvider>
    </UpdateTaskProvider>
  );
}
