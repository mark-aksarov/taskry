"use client";

import { ManageButtonLarge } from "@/dashboard/common/ManageButton";
import { PositionManageMenuTrigger } from "./PositionManageMenuTrigger";

export function PositionManageMenuTriggerLarge() {
  return (
    <PositionManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="position-manage-menu-trigger-large" />
      )}
    />
  );
}
