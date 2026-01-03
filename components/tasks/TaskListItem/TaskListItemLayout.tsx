"use client";

import { ListItem } from "@/components/common/List";

interface TaskListItemLayoutProps {
  checkboxSlot?: React.ReactNode;
  titleSlot: React.ReactNode;
  assigneeSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  projectSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const TaskListItemLayout = ({
  checkboxSlot,
  titleSlot,
  assigneeSlot,
  categorySlot,
  projectSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: TaskListItemLayoutProps) => {
  return (
    <ListItem data-test="task-list-item">
      {checkboxSlot}
      {titleSlot}
      {assigneeSlot}
      {categorySlot}
      {projectSlot}

      <div className="flex flex-none items-center justify-end @max-md:gap-0.5 @md:gap-4">
        {statusSlot}

        <div className="flex items-center @max-md:gap-1 @md:gap-2">
          {commentsModalTriggerSlot}
          {menuTriggerSlot}
        </div>
      </div>
    </ListItem>
  );
};
