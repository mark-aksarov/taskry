"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useDeleteCustomers } from "../DeleteCustomersContext";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface CustomerItemCheckboxProps {
  id: number;
  fullName: string;
}

export function CustomerItemCheckbox({
  id,
  fullName,
}: CustomerItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeleteCustomers();

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
      data-test="customer-checkbox"
      data-id={id}
      aria-label={fullName}
      isSelected={isSelected}
      onChange={handleChange}
    />
  );
}
