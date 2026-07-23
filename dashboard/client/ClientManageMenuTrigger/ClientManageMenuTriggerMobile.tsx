"use client";

import { ManageButtonMobile } from "@/dashboard/common/ManageButton";
import { ClientManageMenuTrigger } from "./ClientManageMenuTrigger";

export function ClientManageMenuTriggerMobile() {
  return (
    <ClientManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="client-manage-menu-trigger-mobile" />
      )}
    />
  );
}
