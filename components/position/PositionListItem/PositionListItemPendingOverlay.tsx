import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { usePositionListItemPending } from "./usePositionListItemPending";

interface PositionListItemPendingOverlayProps {
  positionId: number;
  children: React.ReactNode;
}

export function PositionListItemPendingOverlay({
  positionId,
  children,
}: PositionListItemPendingOverlayProps) {
  const isPending = usePositionListItemPending(positionId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
