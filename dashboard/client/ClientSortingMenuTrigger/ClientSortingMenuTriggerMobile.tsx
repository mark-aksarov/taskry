"use client";

import { ClientSortField } from "@/lib/types";
import { SortingButtonMobile } from "@/dashboard/common/SortingButton";
import { ClientSortingMenuTrigger } from "./ClientSortingMenuTrigger";

interface ClientSortingMenuTriggerMobileProps {
  selectedSortField: ClientSortField;
}

export function ClientSortingMenuTriggerMobile({
  selectedSortField,
}: ClientSortingMenuTriggerMobileProps) {
  return (
    <ClientSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonMobile data-test="client-sorting-menu-trigger-mobile" />
      )}
    />
  );
}
