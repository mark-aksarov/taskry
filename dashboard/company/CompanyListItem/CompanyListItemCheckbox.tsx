"use client";

import { Checkbox } from "@/ui/Checkbox";
import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

interface CompanyListItemCheckboxProps {
  id: number;
  name: string;
}

export function CompanyListItemCheckbox({
  id,
  name,
}: CompanyListItemCheckboxProps) {
  const selected = useSelectedItems();
  const { ids } = useDeleteCompanies();

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
      data-test="company-checkbox"
      data-id={id}
      aria-label={name}
      isSelected={isSelected}
      onChange={handleChange}
      className="max-md:hidden"
    />
  );
}
