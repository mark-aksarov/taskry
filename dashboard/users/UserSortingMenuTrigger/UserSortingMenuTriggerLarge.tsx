"use client";

import { UserSortField } from "@/lib/types";
import { SortingButtonLarge } from "@/dashboard/common/SortingButton";
import { UserSortingMenuTrigger } from "./UserSortingMenuTrigger";

interface UserSortingMenuTriggerLargeProps {
  selectedSortField: UserSortField;
}

export function UserSortingMenuTriggerLarge({
  selectedSortField,
}: UserSortingMenuTriggerLargeProps) {
  return (
    <UserSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonLarge data-test="users-sorting-menu-trigger-large" />
      )}
    />
  );
}
