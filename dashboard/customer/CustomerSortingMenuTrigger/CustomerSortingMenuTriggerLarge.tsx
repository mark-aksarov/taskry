"use client";

import { CustomerSortField } from "@/lib/types";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";
import { CustomerSortingMenuTrigger } from "./CustomerSortingMenuTrigger";

interface CustomerSortingMenuTriggerLargeProps {
  selectedSortField: CustomerSortField;
}

export function CustomerSortingMenuTriggerLarge({
  selectedSortField,
}: CustomerSortingMenuTriggerLargeProps) {
  return (
    <CustomerSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonLarge data-test="customers-sorting-menu-trigger-large" />
      )}
    />
  );
}
