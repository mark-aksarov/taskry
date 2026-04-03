"use client";

import {
  BaseCustomerItemProps,
  CustomerItemPendingOverlay,
} from "../CustomerItem";

import {
  ListItemText,
  ListItemTextLink,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import {
  ListItemTitleLink,
  ListItemTitleButton,
} from "@/components/common/List/ListItemTitle";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { CustomerItemCheckbox } from "../CustomerItem";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useModal } from "@/components/common/ModalManagerContext";

export function CustomerListItem(props: BaseCustomerItemProps) {
  const selected = useSelectedItems();

  return (
    <CustomerItemPendingOverlay customerId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <CustomerListItemInner {...props} />
      </SelectableItem>
    </CustomerItemPendingOverlay>
  );
}

export const CustomerListItemInner = memo(function CustomerListItemInner({
  id,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
}: BaseCustomerItemProps) {
  const t = useTranslations("customers.CustomerListItem");

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
      id={id}
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
