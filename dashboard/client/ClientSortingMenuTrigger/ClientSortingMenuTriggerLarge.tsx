"use client";

import { ClientSortField } from "@/lib/types";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";
import { ClientSortingMenuTrigger } from "./ClientSortingMenuTrigger";

interface ClientSortingMenuTriggerLargeProps {
  selectedSortField: ClientSortField;
}

export function ClientSortingMenuTriggerLarge({
  selectedSortField,
}: ClientSortingMenuTriggerLargeProps) {
  return (
    <ClientSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonLarge data-test="clients-sorting-menu-trigger-large" />
      )}
    />
  );
}
