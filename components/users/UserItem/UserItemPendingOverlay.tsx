import { ItemBasePendingOverlay } from "../../common/ItemBase";
import { useUserItemPending } from "./useUserItemPending";

interface UserItemPendingOverlayProps {
  children: React.ReactNode;
}

export function UserItemPendingOverlay({
  children,
}: UserItemPendingOverlayProps) {
  const isPending = useUserItemPending();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
