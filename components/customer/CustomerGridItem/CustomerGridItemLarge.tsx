"use client";

import {
  GridItemRow,
  GridItemInfo,
  GridItemText,
  GridItemEmail,
  GridItemPublicLink,
  GridItemPhoneNumber,
  GridItemContactList,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/Separator";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { BaseCustomerItemProps, CustomerItemProviders } from "../CustomerItem";
import { CustomerItemActionMenuTrigger } from "../CustomerItem/CustomerItemActionMenuTrigger";

interface Props extends BaseCustomerItemProps {
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
}

export function CustomerGridItemLarge({
  deleteCustomer,
  updateCustomer,
  ...props
}: Props) {
  const selected = useSelectedItems();

  return (
    <CustomerItemProviders
      customerId={props.id}
      deleteCustomer={deleteCustomer}
      updateCustomer={updateCustomer}
    >
      <SelectableItem {...selected} item={{ id: props.id }}>
        <CustomerGridItemLargeInner {...props} />
      </SelectableItem>
    </CustomerItemProviders>
  );
}

type InnerProps = Omit<Props, "deleteCustomer" | "updateCustomer">;

export const CustomerGridItemLargeInner = memo(
  ({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
    customerDetailContainer,
    customerDetailHeaderContainer,
    editCustomerFormContainer,
  }: InnerProps) => {
    const t = useTranslations("customers.CustomerGridItem");

    const customerImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={36}
        height={36}
        className="h-9 w-9"
      />
    );

    const customerDetailModal = (
      <CustomerDetailModal
        customerId={id}
        customerDetailContainer={customerDetailContainer}
        customerDetailHeaderContainer={customerDetailHeaderContainer}
      />
    );

    return (
      <CustomerGridItemLayout
        topRowSlot={
          <GridItemRow>
            <CustomerItemCheckbox id={id} />
            <CustomerItemActionMenuTrigger
              customerId={id}
              customerFullName={fullName}
              editCustomerFormContainer={editCustomerFormContainer}
              className="-mr-2"
            />
          </GridItemRow>
        }
        imageSlot={
          <ItemBaseDetailModalTrigger modal={customerDetailModal}>
            {customerImg}
          </ItemBaseDetailModalTrigger>
        }
        titleSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitleDetailModalTrigger modal={customerDetailModal}>
              {fullName}
            </GridItemTitleDetailModalTrigger>

            <GridItemText>
              {company ? company.name : t("noCompany")}
            </GridItemText>
          </GridItemInfo>
        }
        contactSlot={
          <>
            <Separator />
            <GridItemContactList>
              <GridItemPhoneNumber phoneNumber={phoneNumber} />
              <GridItemPublicLink publicLink={publicLink} />
              <GridItemEmail email={email} />
            </GridItemContactList>
          </>
        }
      />
    );
  },
);
