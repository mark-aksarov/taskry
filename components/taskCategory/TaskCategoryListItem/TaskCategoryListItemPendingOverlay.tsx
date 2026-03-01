import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";

interface TaskCategoryListItemPendingOverlayProps {
  taskCategoryId: number;
  children: React.ReactNode;
}

export function TaskCategoryListItemPendingOverlay({
  taskCategoryId,
  children,
}: TaskCategoryListItemPendingOverlayProps) {
  const isPending = useTaskCategoryListItemPending(taskCategoryId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
