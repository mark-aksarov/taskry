import { ItemBasePendingOverlay } from "../../common/ItemBase";
import { useAssignedTaskItemPending } from "./useAssignedTaskItemPending";

interface AssignedTaskItemPendingOverlayProps {
  children: React.ReactNode;
}

export function AssignedTaskItemPendingOverlay({
  children,
}: AssignedTaskItemPendingOverlayProps) {
  const isPending = useAssignedTaskItemPending();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
