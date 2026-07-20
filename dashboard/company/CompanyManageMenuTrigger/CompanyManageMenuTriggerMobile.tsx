"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { CompanyManageMenuTrigger } from "./CompanyManageMenuTrigger";

export function CompanyManageMenuTriggerMobile() {
  return (
    <CompanyManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="company-manage-menu-trigger-mobile" />
      )}
    />
  );
}
