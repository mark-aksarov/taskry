"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { PositionManageMenuTrigger } from "./PositionManageMenuTrigger";

export function PositionManageMenuTriggerMobile() {
  return (
    <PositionManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="position-manage-menu-trigger-mobile" />
      )}
    />
  );
}
