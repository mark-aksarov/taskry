import { ItemBasePendingOverlay } from "../common/ItemBase";
import { useDeleteTaskContext } from "./DeleteTaskContext";

interface TaskItemDeleteOverlayProps {
  children: React.ReactNode;
}

export function TaskItemDeleteOverlay({
  children,
}: TaskItemDeleteOverlayProps) {
  const { isPending } = useDeleteTaskContext();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
