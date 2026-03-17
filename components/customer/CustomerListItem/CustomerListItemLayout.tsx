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
}: CustomerListItemLayoutProps) => {
  return (
    <ListItem
      data-test="customer-list-item"
      data-id={id}
      className="flex w-full items-center gap-4"
    >
      {checkboxSlot}
      {imgSlot}

      <ListItemInfo>{mainSlot}</ListItemInfo>
      <ListItemInfo className="@max-lg:hidden">{phoneNumberSlot}</ListItemInfo>
      <ListItemInfo className="@max-2xl:hidden">{publicLinkSlot}</ListItemInfo>
      <ListItemInfo className="@max-4xl:hidden">{companySlot}</ListItemInfo>
      {menuTriggerSlot}
    </ListItem>
  );
};
