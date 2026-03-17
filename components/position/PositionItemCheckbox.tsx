"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface PositionItemCheckboxProps {
  id: number;
}

export function PositionItemCheckbox({ id }: PositionItemCheckboxProps) {
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
      data-test="position-checkbox"
      data-id={id}
      aria-label="position checkbox"
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
