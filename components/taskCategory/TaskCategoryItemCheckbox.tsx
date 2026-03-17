"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface TaskCategoryItemCheckboxProps {
  id: number;
}

export function TaskCategoryItemCheckbox({
  id,
}: TaskCategoryItemCheckboxProps) {
  const selected = useSelectedItems();

  function handleChange(isSelected: boolean) {
    if (isSelected) {
      selected.add({ id });
    } else {
      selected.remove(id);
    }
  }

  const isSelected = !!selected.get(id);

  return (
    <Checkbox
      data-test="task-category-checkbox"
      data-id={id}
      aria-label="task category checkbox"
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
