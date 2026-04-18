import { ListItem, ListItemInfo } from "@/components/common/List";

interface TaskListItemLayoutProps {
  "data-id"?: number;
  className?: string;
  checkboxSlot?: React.ReactNode;
  mainSlot: React.ReactNode;
  assigneeImgSlot: React.ReactNode;
  assigneeSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  projectSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const TaskListItemLayout = ({
  "data-id": dataId,
  className,
  checkboxSlot,
  mainSlot,
  assigneeImgSlot,
  assigneeSlot,
  categorySlot,
  projectSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: TaskListItemLayoutProps) => {
  return (
    <ListItem data-test="task-list-item" data-id={dataId} className={className}>
      <div className="flex w-full items-center gap-4">
        {checkboxSlot}
        <ListItemInfo>{mainSlot}</ListItemInfo>
        {assigneeImgSlot}
        <ListItemInfo>{assigneeSlot}</ListItemInfo>
        <ListItemInfo className="@max-3xl:hidden">{categorySlot}</ListItemInfo>
        <ListItemInfo className="@max-4xl:hidden">{projectSlot}</ListItemInfo>

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
