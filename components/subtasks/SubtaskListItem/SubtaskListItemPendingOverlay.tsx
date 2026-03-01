import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { useSubtaskListItemPending } from "./useSubtaskListItemPending";

interface SubtaskListItemPendingOverlayProps {
  children: React.ReactNode;
}

export function SubtaskListItemPendingOverlay({
  children,
}: SubtaskListItemPendingOverlayProps) {
  const isPending = useSubtaskListItemPending();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
