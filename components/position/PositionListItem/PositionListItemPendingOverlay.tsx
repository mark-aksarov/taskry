import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { usePositionListItemPending } from "./usePositionListItemPending";

interface PositionListItemPendingOverlayProps {
  companyId: number;
  children: React.ReactNode;
}

export function PositionListItemPendingOverlay({
  companyId,
  children,
}: PositionListItemPendingOverlayProps) {
  const isPending = usePositionListItemPending(companyId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
