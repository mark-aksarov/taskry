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
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/Separator";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableCustomerItem } from "../SelectableCustomerItem";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { BaseCustomerItemProps, useCustomerItemPending } from "../CustomerItem";

export function CustomerGridItemLarge(props: BaseCustomerItemProps) {
  const isPending = useCustomerItemPending(props.id);

  return (
    <SelectableCustomerItem customerId={props.id}>
      <CustomerGridItemLargeInner {...props} isPending={isPending} />
    </SelectableCustomerItem>
  );
}

type InnerProps = BaseCustomerItemProps & {
  isPending: boolean;
};

export const CustomerGridItemLargeInner = memo(
  function CustomerGridItemLargeInner({
    id,
    isPending,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
  }: InnerProps) {
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
        className={isPending ? "*:opacity-50" : undefined}
        topRowSlot={
          <GridItemRow>
            <CustomerItemCheckbox id={id} />
            <CustomerItemActionMenuTrigger customerId={id} className="-mr-2" />
          </GridItemRow>
        }
        imageSlot={
          <ItemBaseDetailButton
            aria-label={fullName}
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
