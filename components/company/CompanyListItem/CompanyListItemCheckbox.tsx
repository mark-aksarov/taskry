"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CompanyListItemCheckboxProps {
  id: number;
}

export function CompanyListItemCheckbox({ id }: CompanyListItemCheckboxProps) {
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
      data-test="company-checkbox"
      data-id={id}
      aria-label="company checkbox"
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
