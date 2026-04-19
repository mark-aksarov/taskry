import { ListItem, ListItemInfo } from "@/components/common/ListItem";
import { twMerge } from "tailwind-merge";

interface UserListItemLayoutProps {
  "data-id"?: string;
  className?: string;
  imgSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  positionSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const UserListItemLayout = ({
  "data-id": dataId,
  className,
  imgSlot,
  mainSlot,
  phoneNumberSlot,
  publicLinkSlot,
  positionSlot,
  menuTriggerSlot,
}: UserListItemLayoutProps) => {
  return (
    <ListItem
      data-test="user-list-item"
      data-id={dataId}
      className={twMerge("flex w-full items-center gap-4", className)}
    >
      {imgSlot}
      <ListItemInfo>{mainSlot}</ListItemInfo>
      <ListItemInfo className="@max-lg:hidden">{phoneNumberSlot}</ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">{publicLinkSlot}</ListItemInfo>
      <ListItemInfo className="@max-4xl:hidden">{positionSlot}</ListItemInfo>
      {menuTriggerSlot}
    </ListItem>
  );
};
