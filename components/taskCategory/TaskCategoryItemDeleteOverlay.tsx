import { ItemBasePendingOverlay } from "../common/ItemBase";
import { useDeleteTaskCategoryContext } from "./DeleteTaskCategoryContext";

interface TaskCategoryItemDeleteOverlayProps {
  children: React.ReactNode;
}

export function TaskCategoryItemDeleteOverlay({
  children,
}: TaskCategoryItemDeleteOverlayProps) {
  const { isPending } = useDeleteTaskCategoryContext();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
