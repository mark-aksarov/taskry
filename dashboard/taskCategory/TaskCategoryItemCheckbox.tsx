"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { useDeleteTaskCategories } from "./DeleteTaskCategoriesContext";

interface TaskCategoryItemCheckboxProps {
  id: number;
  name: string;
}

export function TaskCategoryItemCheckbox({
  id,
  name,
}: TaskCategoryItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeleteTaskCategories();

  function handleChange(isSelected: boolean) {
    if (isSelected) {
      selected.add({ id });
    } else {
      selected.remove(id);
    }
  }

  const isSelected = !!selected.get(id) || ids.includes(id);

  return (
    <Checkbox
      data-test="task-category-checkbox"
      data-id={id}
      aria-label={name}
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
