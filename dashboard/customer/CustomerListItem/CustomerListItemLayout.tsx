import { twMerge } from "tailwind-merge";
import { ListItem, ListItemInfo } from "@/dashboard/common/ListItem";

interface CustomerListItemLayoutProps {
  "data-id"?: number;
  className?: string;
  checkboxSlot: React.ReactNode;
  imgSlot: React.ReactNode;
  mainSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
  publicLinkSlot: React.ReactNode;
  companySlot: React.ReactNode;
  menuTriggerSlot: React.ReactNode;
}

export const CustomerListItemLayout = ({
  "data-id": dataId,
  className,
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
      data-id={dataId}
      className={twMerge("flex w-full items-center gap-4", className)}
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
