import { SelectableItem } from "../common/SelectableItem";
import { useProjectCategoryListItemPending } from "./ProjectCategoryListItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface SelectableProjectCategoryItemProps {
  projectCategoryId: number;
  children: React.ReactNode;
}

export function SelectableProjectCategoryItem({
  projectCategoryId,
  children,
}: SelectableProjectCategoryItemProps) {
  const selected = useSelectedItems();
  const isPending = useProjectCategoryListItemPending(projectCategoryId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: projectCategoryId }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
