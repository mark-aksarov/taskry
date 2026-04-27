"use client";

import {
  ListItemText,
  ListItemTextLink,
  ListItemTitle,
} from "@/dashboard/common/ListItem";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import {
  ListItemTitleLink,
  ListItemTitleButton,
} from "@/dashboard/common/ListItem/ListItemTitle";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { CustomerItemCheckbox } from "../CustomerItem";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { useModal } from "@/common/ModalManagerContext";
import { SelectableCustomerItem } from "../SelectableCustomerItem";
import { CustomerListItemSkeleton } from "./CustomerListItemSkeleton";
import { BaseCustomerItemProps, useCustomerItemPending } from "../CustomerItem";

export function CustomerListItem(props: BaseCustomerItemProps) {
  const isPending = useCustomerItemPending(props.id);

  return (
    <ListItemGate skeleton={<CustomerListItemSkeleton />}>
      <SelectableCustomerItem customerId={props.id}>
        <CustomerListItemInner {...props} isPending={isPending} />
      </SelectableCustomerItem>
    </ListItemGate>
  );
}

type InnerProps = BaseCustomerItemProps & {
  isPending: boolean;
};

export const CustomerListItemInner = memo(function CustomerListItemInner({
  id,
  isPending,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
}: InnerProps) {
  const t = useTranslations("dashboard.customers.CustomerListItem");

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
    <CustomerListItemLayout
      data-id={id}
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={<CustomerItemCheckbox id={id} />}
      imgSlot={
        <ItemBaseDetailButton
          aria-label={fullName}
          onPress={() => onCustomerDetailModalOpenChange(true)}
          className="h-9 w-9"
        >
          {customerImg}
        </ItemBaseDetailButton>
      }
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onCustomerDetailModalOpenChange(true)}
          >
            {fullName}
          </ListItemTitleButton>

          <ListItemTextLink href={`mailto:${email}`}>{email}</ListItemTextLink>
        </>
      }
      phoneNumberSlot={
        <>
          {phoneNumber ? (
            <ListItemTitleLink href={`tel:${phoneNumber}`}>
              {phoneNumber}
            </ListItemTitleLink>
          ) : (
            <ListItemTitle>{t("noPhoneNumber")}</ListItemTitle>
          )}

          <ListItemText>{t("phoneNumber")}</ListItemText>
        </>
      }
      publicLinkSlot={
        <>
          {publicLink ? (
            <ListItemTitleLink href={publicLink}>
              {publicLink}
            </ListItemTitleLink>
          ) : (
            <ListItemTitle>{t("noPublicLink")}</ListItemTitle>
          )}

          <ListItemText>{t("publicLink")}</ListItemText>
        </>
      }
      companySlot={
        <>
          <ListItemTitle>
            {company ? company.name : t("noCompany")}
          </ListItemTitle>
          <ListItemText>{t("company")}</ListItemText>
        </>
      }
      menuTriggerSlot={<CustomerItemActionMenuTrigger customerId={id} />}
    />
  );
});
