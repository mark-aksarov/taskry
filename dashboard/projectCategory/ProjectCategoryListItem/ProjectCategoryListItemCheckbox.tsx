"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface ProjectCategoryListItemCheckboxProps {
  id: number;
}

export function ProjectCategoryListItemCheckbox({
  id,
}: ProjectCategoryListItemCheckboxProps) {
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
      data-test="project-category-checkbox"
      data-id={id}
      aria-label="project category checkbox"
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
