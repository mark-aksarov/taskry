"use client";

import {
  GridItemRow,
  GridItemInfo,
  GridItemText,
  GridItemEmail,
  GridItemPublicLink,
  GridItemPhoneNumber,
  GridItemContactList,
  GridItemTitleButton,
} from "@/components/common/Grid";

import {
  BaseCustomerItemProps,
  CustomerItemPendingOverlay,
} from "../CustomerItem";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/Separator";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useModal } from "@/components/common/ModalManagerContext";

export function CustomerGridItemLarge(props: BaseCustomerItemProps) {
  const selected = useSelectedItems();

  return (
    <CustomerItemPendingOverlay customerId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <CustomerGridItemLargeInner {...props} />
      </SelectableItem>
    </CustomerItemPendingOverlay>
  );
}

export const CustomerGridItemLargeInner = memo(
  function CustomerGridItemLargeInner({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
  }: BaseCustomerItemProps) {
    const t = useTranslations("customers.CustomerGridItem");

    const { onOpenChange: onCustomerDetailModalOpenChange } =
      useModal("customerDetail");

    const customerImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={36}
        height={36}
        className="h-9 w-9"
      />
    );

    return (
      <CustomerGridItemLayout
        topRowSlot={
          <GridItemRow>
            <CustomerItemCheckbox id={id} />
            <CustomerItemActionMenuTrigger customerId={id} className="-mr-2" />
          </GridItemRow>
        }
        imageSlot={
          <ItemBaseDetailButton
            onPress={() => onCustomerDetailModalOpenChange(true)}
          >
            {customerImg}
          </ItemBaseDetailButton>
        }
        titleSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitleButton
              onPress={() => onCustomerDetailModalOpenChange(true)}
            >
              {fullName}
            </GridItemTitleButton>

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
