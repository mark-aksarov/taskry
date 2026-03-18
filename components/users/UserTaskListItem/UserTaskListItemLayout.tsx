import { ListItem, ListItemInfo } from "@/components/common/List";

export interface UserTaskListItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  mainSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const UserTaskListItemLayout = ({
  checkboxSlot,
  mainSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: UserTaskListItemLayoutProps) => {
  return (
    <ListItem className="border-gray-300 md:rounded-none md:border-b-1 md:px-0 md:py-4 md:shadow-none dark:border-gray-600">
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
