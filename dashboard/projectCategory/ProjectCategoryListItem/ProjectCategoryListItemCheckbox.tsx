"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { useDeleteProjectCategories } from "../DeleteProjectCategoriesContext";

interface ProjectCategoryListItemCheckboxProps {
  id: number;
  name: string;
}

export function ProjectCategoryListItemCheckbox({
  id,
  name,
}: ProjectCategoryListItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeleteProjectCategories();

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
      data-test="project-category-checkbox"
      data-id={id}
      aria-label={name}
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
