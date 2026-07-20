"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useDeletePositions } from "./DeletePositionsContext";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface PositionItemCheckboxProps {
  id: number;
  name: string;
}

export function PositionItemCheckbox({ id, name }: PositionItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeletePositions();

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
      data-test="position-checkbox"
      data-id={id}
      aria-label={name}
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
