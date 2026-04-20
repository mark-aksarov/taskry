"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface CustomerItemCheckboxProps {
  id: number;
}

export function CustomerItemCheckbox({ id }: CustomerItemCheckboxProps) {
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
      data-test="customer-checkbox"
      data-id={id}
      aria-label="customer checkbox"
      isSelected={isSelected}
      onChange={handleChange}
    />
  );
}
