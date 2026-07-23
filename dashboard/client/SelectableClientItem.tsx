import { SelectableItem } from "../common/SelectableItem";
import { useClientItemPending } from "./ClientItem";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface SelectableClientItemProps {
  clientId: number;
  children: React.ReactNode;
}

export function SelectableClientItem({
  clientId,
  children,
}: SelectableClientItemProps) {
  const selected = useSelectedItems();
  const isPending = useClientItemPending(clientId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: clientId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
