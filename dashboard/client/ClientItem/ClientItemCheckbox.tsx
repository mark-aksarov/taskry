"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useDeleteClients } from "../DeleteClientsContext";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface ClientItemCheckboxProps {
  id: number;
  fullName: string;
}

export function ClientItemCheckbox({
  id,
  fullName,
}: ClientItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeleteClients();

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
      data-test="client-checkbox"
      data-id={id}
      aria-label={fullName}
      isSelected={isSelected}
      onChange={handleChange}
    />
  );
}
