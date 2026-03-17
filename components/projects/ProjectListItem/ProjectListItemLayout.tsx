import { ListItem, ListItemInfo } from "@/components/common/List";

export interface ProjectListItemLayoutProps {
  id?: number;
  checkboxSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  creatorImgSlot: React.ReactNode;
  creatorSlot: React.ReactNode;
  customerImgSlot: React.ReactNode;
  customerSlot: React.ReactNode;
  companySlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const ProjectListItemLayout = ({
  id,
  checkboxSlot,
  mainSlot,
  creatorImgSlot,
  creatorSlot,
  customerImgSlot,
  customerSlot,
  categorySlot,
  companySlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: ProjectListItemLayoutProps) => {
  return (
    <ListItem data-test="project-list-item" data-id={id}>
      <div className="flex w-full items-center gap-4">
        {checkboxSlot}
        <ListItemInfo>{mainSlot}</ListItemInfo>
        {creatorImgSlot}
        <ListItemInfo>{creatorSlot}</ListItemInfo>
        {customerImgSlot}
        <ListItemInfo>{customerSlot}</ListItemInfo>
        <ListItemInfo className="@max-4xl:hidden">{categorySlot}</ListItemInfo>
        <ListItemInfo className="@max-5xl:hidden">{companySlot}</ListItemInfo>

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
