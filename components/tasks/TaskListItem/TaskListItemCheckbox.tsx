import { Checkbox } from "@/components/ui";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";

export function TaskListItemCheckbox({ id }: { id: number }) {
  const { isSelected, toggleItem } = useTaskSelection();

  return (
    <Checkbox
      aria-label="task checkbox"
      isSelected={isSelected(id)}
      onChange={() => toggleItem(id)}
    />
  );
}
