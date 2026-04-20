"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { CustomerManageMenuTrigger } from "./CustomerManageMenuTrigger";

export function CustomerManageMenuTriggerMobile() {
  return (
    <CustomerManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="customer-manage-menu-trigger-mobile" />
      )}
    />
  );
}
