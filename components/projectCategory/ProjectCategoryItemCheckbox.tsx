"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface ProjectCategoryItemCheckboxProps {
  id: number;
}

export function ProjectCategoryItemCheckbox({
  id,
}: ProjectCategoryItemCheckboxProps) {
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
    />
  );
}
