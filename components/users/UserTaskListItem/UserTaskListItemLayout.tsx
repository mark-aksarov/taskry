import { ListItem } from "@/components/common/List";

export interface UserTaskListItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  deadlineSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  actionMenuSlot: React.ReactNode;
}

export const UserTaskListItemLayout = ({
  checkboxSlot,
  deadlineSlot,
  statusSlot,
  commentsSlot,
  actionMenuSlot,
}: UserTaskListItemLayoutProps) => {
  return (
    <ListItem className="border-gray-300 md:rounded-none md:px-0 md:py-4 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
      {checkboxSlot}
      {deadlineSlot}

      <div className="flex items-center @max-md:gap-1 @md:gap-2">
        {statusSlot}
        {commentsSlot}
        {actionMenuSlot}
      </div>
    </ListItem>
  );
};
