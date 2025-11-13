"use client";

import { ListItem } from "@/components/common/List/index";

export interface ProjectListItemProps {
  checkboxSlot?: React.ReactNode;
  titleSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  companySlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const ProjectListItemLayout = ({
  checkboxSlot,
  titleSlot,
  creatorSlot,
  customerSlot,
  categorySlot,
  companySlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: ProjectListItemProps) => {
  return (
    <ListItem>
      {checkboxSlot}
      {titleSlot}
      {creatorSlot}
      {customerSlot}
      {categorySlot}
      {companySlot}

      <div className="flex flex-none items-center justify-end gap-4">
        {statusSlot}

        <div className="flex items-center gap-2">
          {commentsModalTriggerSlot}
          {menuTriggerSlot}
        </div>
      </div>
    </ListItem>
  );
};
