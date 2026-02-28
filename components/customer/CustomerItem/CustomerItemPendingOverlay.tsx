import { ItemBasePendingOverlay } from "../../common/ItemBase";
import { useCustomerItemPending } from "./useCustomerItemPending";

interface CustomerItemPendingOverlayProps {
  customerId: number;
  children: React.ReactNode;
}

export function CustomerItemPendingOverlay({
  customerId,
  children,
}: CustomerItemPendingOverlayProps) {
  const isPending = useCustomerItemPending(customerId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
