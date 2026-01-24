import { Checkbox } from "@/components/ui/Checkbox";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";

export function TaskListItemCheckbox({ id }: { id: number }) {
  const { isSelected, toggleItem } = useTaskSelection();

  return (
    <Checkbox
      data-test={`task-${id}-checkbox`}
      aria-label="task checkbox"
      isSelected={isSelected(id)}
      onChange={() => toggleItem(id)}
    />
  );
}
