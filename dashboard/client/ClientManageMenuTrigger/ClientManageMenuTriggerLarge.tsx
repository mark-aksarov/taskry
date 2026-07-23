"use client";

import { ManageButtonLarge } from "@/dashboard/common/ManageButton";
import { ClientManageMenuTrigger } from "./ClientManageMenuTrigger";

export function ClientManageMenuTriggerLarge() {
  return (
    <ClientManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="client-manage-menu-trigger-large" />
      )}
    />
  );
}
