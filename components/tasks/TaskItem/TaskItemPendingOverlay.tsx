import { ItemBasePendingOverlay } from "../../common/ItemBase";
import { useTaskItemPending } from "./useTaskItemPending";

interface TaskItemPendingOverlayProps {
  taskId: number;
  children: React.ReactNode;
}

export function TaskItemPendingOverlay({
  taskId,
  children,
}: TaskItemPendingOverlayProps) {
  const isPending = useTaskItemPending(taskId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
