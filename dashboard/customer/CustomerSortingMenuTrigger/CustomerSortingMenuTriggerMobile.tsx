"use client";

import { CustomerSortField } from "@/lib/types";
import { SortingButtonMobile } from "@/dashboard/common/SortingButton";
import { CustomerSortingMenuTrigger } from "./CustomerSortingMenuTrigger";

interface CustomerSortingMenuTriggerMobileProps {
  selectedSortField: CustomerSortField;
}

export function CustomerSortingMenuTriggerMobile({
  selectedSortField,
}: CustomerSortingMenuTriggerMobileProps) {
  return (
    <CustomerSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonMobile data-test="customer-sorting-menu-trigger-mobile" />
      )}
    />
  );
}
