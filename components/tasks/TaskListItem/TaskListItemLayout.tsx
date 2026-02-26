import { ListItem, ListItemInfo } from "@/components/common/List";
import { twMerge } from "tailwind-merge";

interface TaskListItemLayoutProps {
  id?: number;
  checkboxSlot?: React.ReactNode;
  mainSlot: React.ReactNode;
  mainMobileSlot: React.ReactNode;
  assigneeImgSlot: React.ReactNode;
  assigneeSlot: React.ReactNode;
  categorySlot: React.ReactNode;
  projectSlot: React.ReactNode;
  statusSlot: React.ReactNode;
  commentsModalTriggerSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const TaskListItemLayout = ({
  id,
  checkboxSlot,
  mainSlot,
  mainMobileSlot,
  assigneeImgSlot,
  assigneeSlot,
  categorySlot,
  projectSlot,
  statusSlot,
  commentsModalTriggerSlot,
  menuTriggerSlot,
}: TaskListItemLayoutProps) => {
  return (
    <ListItem data-test="task-list-item" data-id={id}>
      <div className="flex w-full items-center gap-4 max-md:hidden">
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

      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex w-full items-center gap-4">
          {checkboxSlot}
          <ListItemInfo>{mainMobileSlot}</ListItemInfo>
          {menuTriggerSlot}
        </div>
        <div className={twMerge("h-[1.75rem]", checkboxSlot && "ml-9")}>
          {statusSlot}
        </div>
      </div>
    </ListItem>
  );
};
