import { ListItem, ListItemInfo } from "@/components/common/List";

interface CustomerListItemLayoutProps {
  id?: number;
  checkboxSlot: React.ReactNode;
  imgSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  companySlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
  imgMobileSlot: React.ReactNode;
  mainMobileSlot: React.ReactNode;
}

export const CustomerListItemLayout = ({
  id,
  checkboxSlot,
  imgSlot,
  mainSlot,
  phoneNumberSlot,
  publicLinkSlot,
  companySlot,
  menuTriggerSlot,
  imgMobileSlot,
  mainMobileSlot,
}: CustomerListItemLayoutProps) => {
  return (
    <ListItem
      data-test="user-list-item"
      data-id={id}
      className="flex w-full items-center gap-4"
    >
      {checkboxSlot}
      {imgSlot}
      {imgMobileSlot}

      <ListItemInfo className="max-md:hidden">{mainSlot}</ListItemInfo>
      <ListItemInfo className="md:hidden">{mainMobileSlot}</ListItemInfo>

      <ListItemInfo className="@max-lg:hidden">{phoneNumberSlot}</ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">{publicLinkSlot}</ListItemInfo>
      <ListItemInfo className="@max-4xl:hidden">{companySlot}</ListItemInfo>
      {menuTriggerSlot}
    </ListItem>
  );
};
