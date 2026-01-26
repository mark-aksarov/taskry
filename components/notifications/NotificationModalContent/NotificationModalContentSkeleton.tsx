"use client";

import { DialogBody } from "@/components/ui/Dialog";
import { Repeat } from "@/components/common/Repeat";
import { NotificationList } from "../NotificationList";
import { NotificationModalActions } from "./NotificationModalActions";
import { NotificationListItemSkeleton } from "../NotificationListItem";
import { NotificationFilterToggleButtonGroupSkeleton } from "../NotificationFilterToggleButtonGroup";

export function NotificationModalContentSkeleton() {
  return (
    <DialogBody className="p-0!">
      <NotificationModalActions>
        <NotificationFilterToggleButtonGroupSkeleton />
      </NotificationModalActions>

      <NotificationList>
        <Repeat
          items={10}
          renderItem={() => <NotificationListItemSkeleton />}
        />
      </NotificationList>
    </DialogBody>
  );
}
