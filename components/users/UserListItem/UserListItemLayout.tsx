import { ListItem, ListItemInfo } from "@/components/common/List";

interface UserListItemLayoutProps {
  id?: string;
  imgSlot: React.ReactNode;
  infoSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  positionSlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  imgMobileSlot: React.ReactNode;
  infoMobileSlot: React.ReactNode;
}

export const UserListItemLayout = ({
  id,
  imgSlot,
  infoSlot,
  phoneNumberSlot,
  publicLinkSlot,
  positionSlot,
  menuTriggerSlot,
  imgMobileSlot,
  infoMobileSlot,
}: UserListItemLayoutProps) => {
  return (
    <ListItem
      data-test="user-list-item"
      data-id={id}
      className="flex w-full items-center gap-4"
    >
      {imgSlot}
      {imgMobileSlot}

      <ListItemInfo className="max-md:hidden">{infoSlot}</ListItemInfo>
      <ListItemInfo className="md:hidden">{infoMobileSlot}</ListItemInfo>

      <ListItemInfo className="@max-lg:hidden">{phoneNumberSlot}</ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">{publicLinkSlot}</ListItemInfo>
      <ListItemInfo className="@max-4xl:hidden">{positionSlot}</ListItemInfo>
      {menuTriggerSlot}
    </ListItem>
  );
};
