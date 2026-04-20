import { ListItem, ListItemInfo } from "@/dashboard/common/ListItem";
import { twMerge } from "tailwind-merge";

export interface UserTaskListItemLayoutProps {
  className?: string;
  checkboxSlot?: React.ReactNode;
  mainSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const UserTaskListItemLayout = ({
  className,
  checkboxSlot,
  mainSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: UserTaskListItemLayoutProps) => {
  return (
    <ListItem
      className={twMerge(
        "border-gray-300 md:rounded-none md:border-b-1 md:px-0 md:py-4 md:shadow-none dark:border-gray-600",
        className,
      )}
    >
      <div className="flex w-full items-center gap-4">
        {checkboxSlot}
        <ListItemInfo>{mainSlot}</ListItemInfo>

        <div className="flex flex-none items-center justify-end gap-4">
          {statusSlot}

          <div className="flex items-center gap-2">
            {commentsModalTriggerSlot}
            {menuTriggerSlot}
          </div>
        </div>
      </div>
    </ListItem>
  );
};
