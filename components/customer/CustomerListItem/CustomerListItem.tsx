"use client";

import {
  BaseCustomerItemProps,
  CustomerItemPendingOverlay,
} from "../CustomerItem";

import {
  ListItemText,
  ListItemTextLink,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { CustomerItemCheckbox } from "../CustomerItem";
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ListItemTitleLink } from "@/components/common/List/ListItemTitle";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface Props extends BaseCustomerItemProps {
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
}

export function CustomerListItem(props: Props) {
  const selected = useSelectedItems();

  return (
    <CustomerItemPendingOverlay customerId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <CustomerListItemInner {...props} />
      </SelectableItem>
    </CustomerItemPendingOverlay>
  );
}

export const CustomerListItemInner = memo(
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
    updateCustomerFormContainer,
  }: Props) => {
    const t = useTranslations("customers.CustomerListItem");

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
      <CustomerListItemLayout
        id={id}
        checkboxSlot={<CustomerItemCheckbox id={id} />}
        imgSlot={
          <ItemBaseDetailModalTrigger
            modal={customerDetailModal}
            className="h-9 w-9"
          >
            {customerImg}
          </ItemBaseDetailModalTrigger>
        }
        mainSlot={
          <>
            <ListItemTitleDetailModalTrigger modal={customerDetailModal}>
              {fullName}
            </ListItemTitleDetailModalTrigger>

            <ListItemTextLink href={`mailto:${email}`}>
              {email}
            </ListItemTextLink>
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
        menuTriggerSlot={
          <CustomerItemActionMenuTrigger
            customerId={id}
            customerFullName={fullName}
            updateCustomerFormContainer={updateCustomerFormContainer}
          />
        }
      />
    );
  },
);
