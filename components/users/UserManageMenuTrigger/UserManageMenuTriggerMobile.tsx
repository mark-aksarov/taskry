"use client";

import { ManageButtonMobile } from "@/components/common/ManageButton";
import { UserManageMenuTrigger } from "./UserManageMenuTrigger";

export function UserManageMenuTriggerMobile() {
  return (
    <UserManageMenuTrigger
      renderButton={() => (
        <ManageButtonMobile data-test="user-manage-menu-trigger-mobile" />
      )}
    />
  );
}
