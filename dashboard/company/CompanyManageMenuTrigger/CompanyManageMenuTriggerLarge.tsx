"use client";

import { ManageButtonLarge } from "@/dashboard/common/ManageButton";
import { CompanyManageMenuTrigger } from "./CompanyManageMenuTrigger";

export function CompanyManageMenuTriggerLarge() {
  return (
    <CompanyManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="company-manage-menu-trigger-large" />
      )}
    />
  );
}
