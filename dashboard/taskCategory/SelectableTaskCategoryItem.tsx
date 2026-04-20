import { SelectableItem } from "../common/SelectableItem";
import { useTaskCategoryListItemPending } from "./TaskCategoryListItem";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface SelectableTaskCategoryItemProps {
  taskCategoryId: number;
  children: React.ReactNode;
}

export function SelectableTaskCategoryItem({
  taskCategoryId,
  children,
}: SelectableTaskCategoryItemProps) {
  const selected = useSelectedItems();
  const isPending = useTaskCategoryListItemPending(taskCategoryId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: taskCategoryId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
