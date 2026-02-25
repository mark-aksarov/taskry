import { ListItem } from "@/components/common/List";

export interface ProjectListItemProps {
  id?: number;
  checkboxSlot: React.ReactNode;
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
  id,
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
    <ListItem data-test="project-list-item" data-id={id}>
      {checkboxSlot}
      {titleSlot}
      {creatorSlot}
      {customerSlot}
      {categorySlot}
      {companySlot}

      <div className="flex flex-none items-center justify-end gap-4">
        {statusSlot}

        <div className="flex items-center @max-md:gap-1 @md:gap-2">
          <div className="@max-lg:hidden">{commentsModalTriggerSlot}</div>
          {menuTriggerSlot}
        </div>
      </div>
    </ListItem>
  );
};
