"use client";

import { ManageButtonLarge } from "@/components/common/ManageButton";
import { CustomerManageMenuTrigger } from "./CustomerManageMenuTrigger";

export function CustomerManageMenuTriggerLarge() {
  return (
    <CustomerManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="customer-manage-menu-trigger-large" />
      )}
    />
  );
}
