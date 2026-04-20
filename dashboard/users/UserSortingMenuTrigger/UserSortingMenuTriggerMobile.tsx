"use client";

import { UserSortField } from "@/lib/types";
import { SortingButtonMobile } from "@/dashboard/common/SortingButton";
import { UserSortingMenuTrigger } from "./UserSortingMenuTrigger";

interface UserSortingMenuTriggerMobileProps {
  selectedSortField: UserSortField;
}

export function UserSortingMenuTriggerMobile({
  selectedSortField,
}: UserSortingMenuTriggerMobileProps) {
  return (
    <UserSortingMenuTrigger
      selectedSortField={selectedSortField}
      renderButton={() => (
        <SortingButtonMobile data-test="user-sorting-menu-trigger-mobile" />
      )}
    />
  );
}
