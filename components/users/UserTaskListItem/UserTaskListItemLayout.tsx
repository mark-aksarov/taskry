import { ListItem, ListItemInfo } from "@/components/common/List";
import { twMerge } from "tailwind-merge";

export interface UserTaskListItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  infoSlot: React.ReactNode;
  infoMobileSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const UserTaskListItemLayout = ({
  checkboxSlot,
  infoSlot,
  infoMobileSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: UserTaskListItemLayoutProps) => {
  return (
    <ListItem className="border-gray-300 md:rounded-none md:border-b-1 md:px-0 md:py-4 md:shadow-none dark:border-gray-600">
      <div className="flex w-full items-center gap-4 max-md:hidden">
        {checkboxSlot}
        <ListItemInfo>{infoSlot}</ListItemInfo>

        <div className="flex flex-none items-center justify-end gap-4">
          {statusSlot}

          <div className="flex items-center gap-2">
            {commentsModalTriggerSlot}
            {menuTriggerSlot}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex w-full items-center gap-4">
          {checkboxSlot}
          <ListItemInfo>{infoMobileSlot}</ListItemInfo>
          {menuTriggerSlot}
        </div>
        <div className={twMerge("h-[1.75rem]", checkboxSlot && "ml-9")}>
          {statusSlot}
        </div>
      </div>
    </ListItem>
  );
};
