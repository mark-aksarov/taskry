import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { useCompanyListItemPending } from "./useCompanyListItemPending";

interface CompanyListItemPendingOverlayProps {
  companyId: number;
  children: React.ReactNode;
}

export function CompanyListItemPendingOverlay({
  companyId,
  children,
}: CompanyListItemPendingOverlayProps) {
  const isPending = useCompanyListItemPending(companyId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
