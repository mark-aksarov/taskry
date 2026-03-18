"use client";

import { ManageButtonLarge } from "@/components/common/ManageButton";
import { UserManageMenuTrigger } from "./UserManageMenuTrigger";

export function UserManageMenuTriggerLarge() {
  return (
    <UserManageMenuTrigger
      renderButton={() => (
        <ManageButtonLarge data-test="user-manage-menu-trigger-large" />
      )}
    />
  );
}
