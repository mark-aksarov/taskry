import {
  ActionFn,
  ActionState,
  DeleteTaskPayload,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import { TaskStatus } from "@/generated/prisma/enums";
import { UpdateTaskProvider } from "../UpdateTaskContext";
import { DeleteTaskProvider } from "../DeleteTaskContext";
import { useSelectedTasks } from "../SelectedTasksContext";
import { TaskItemPendingOverlay } from "./TaskItemPendingOverlay";
import { SelectableItem } from "@/components/common/SelectableItem";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";

interface TaskItemProvidersProps {
  taskId: number;
  taskStatus: TaskStatus;
  updateTask: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
  children: React.ReactNode;
}

export function TaskItemProviders({
  taskId,
  taskStatus,
  updateTask,
  deleteTask,
  updateTaskStatus,
  children,
}: TaskItemProvidersProps) {
  const selected = useSelectedTasks();

  return (
    <UpdateTaskProvider updateTask={updateTask}>
      <DeleteTaskProvider deleteTask={deleteTask}>
        <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
          <TaskItemPendingOverlay taskId={taskId}>
            <SelectableItem
              {...selected}
              item={{ id: taskId, status: taskStatus }}
            >
              {children}
            </SelectableItem>
          </TaskItemPendingOverlay>
        </UpdateTaskStatusProvider>
      </DeleteTaskProvider>
    </UpdateTaskProvider>
  );
}
