import { SelectableItem } from "../common/SelectableItem";
import { useCompanyListItemPending } from "./CompanyListItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface SelectableCompanyItemProps {
  companyId: number;
  children: React.ReactNode;
}

export function SelectableCompanyItem({
  companyId,
  children,
}: SelectableCompanyItemProps) {
  const selected = useSelectedItems();
  const isPending = useCompanyListItemPending(companyId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: companyId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
