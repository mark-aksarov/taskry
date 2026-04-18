import { SelectableItem } from "../common/SelectableItem";
import { useCustomerItemPending } from "./CustomerItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface SelectableCustomerItemProps {
  customerId: number;
  children: React.ReactNode;
}

export function SelectableCustomerItem({
  customerId,
  children,
}: SelectableCustomerItemProps) {
  const selected = useSelectedItems();
  const isPending = useCustomerItemPending(customerId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: customerId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
