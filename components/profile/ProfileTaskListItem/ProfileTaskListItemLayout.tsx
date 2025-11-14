import { ListItem } from "@/components/common/List";

export interface ProfileTaskListItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  deadlineSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsSlot: React.ReactNode;
  subtasksSlot: React.ReactNode;
  actionMenuSlot: React.ReactNode;
}

export const ProfileTaskListItemLayout = ({
  checkboxSlot,
  deadlineSlot,
  statusSlot,
  commentsSlot,
  subtasksSlot,
  actionMenuSlot,
}: ProfileTaskListItemLayoutProps) => {
  return (
    <ListItem className="border-gray-300 md:rounded-none md:px-0 md:py-4 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
      {checkboxSlot}
      {deadlineSlot}

      <div className="flex items-center gap-2">
        {statusSlot}
        {commentsSlot}

        <div className="flex items-center gap-1">
          {subtasksSlot}
          {actionMenuSlot}
        </div>
      </div>
    </ListItem>
  );
};
