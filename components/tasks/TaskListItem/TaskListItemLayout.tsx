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
  subtasksModalTriggerSlot: React.ReactNode;
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
  subtasksModalTriggerSlot,
  menuTriggerSlot,
}: TaskListItemLayoutProps) => {
  return (
    <ListItem>
      {checkboxSlot}
      {titleSlot}
      {assigneeSlot}
      {categorySlot}
      {projectSlot}

      <div className="flex flex-none items-center justify-end @max-md:gap-0.5 @md:gap-4">
        {statusSlot}
        {commentsModalTriggerSlot}

        <div className="flex items-center gap-2">
          {subtasksModalTriggerSlot}
          {menuTriggerSlot}
        </div>
      </div>
    </ListItem>
  );
};
