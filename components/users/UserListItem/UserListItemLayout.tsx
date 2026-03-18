import { ListItem, ListItemInfo } from "@/components/common/List";

interface UserListItemLayoutProps {
  id?: string;
  imgSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  positionSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const UserListItemLayout = ({
  id,
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
      data-id={id}
      className="flex w-full items-center gap-4"
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
