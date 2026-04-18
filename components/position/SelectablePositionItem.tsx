import { SelectableItem } from "../common/SelectableItem";
import { usePositionListItemPending } from "./PositionListItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface SelectablePositionItemProps {
  positionId: number;
  children: React.ReactNode;
}

export function SelectablePositionItem({
  positionId,
  children,
}: SelectablePositionItemProps) {
  const selected = useSelectedItems();
  const isPending = usePositionListItemPending(positionId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: positionId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
