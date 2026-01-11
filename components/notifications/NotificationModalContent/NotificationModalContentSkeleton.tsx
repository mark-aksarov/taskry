import { DialogBody } from "@/components/ui";
import { Repeat } from "@/components/common/Repeat";
import { NotificationList } from "../NotificationList";
import { NotificationListItemSkeleton } from "../NotificationListItem";
import { NotificationFilterToggleButtonGroupSkeleton } from "../NotificationFilterToggleButtonGroup";

export function NotificationModalContentSkeleton() {
  return (
    <DialogBody className="p-0!">
      <NotificationFilterToggleButtonGroupSkeleton />
      <NotificationList>
        <Repeat
          items={10}
          renderItem={() => <NotificationListItemSkeleton />}
        />
      </NotificationList>
    </DialogBody>
  );
}
