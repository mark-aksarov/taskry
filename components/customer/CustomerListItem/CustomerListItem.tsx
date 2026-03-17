"use client";

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
import { CustomerDetailModal } from "../CustomerDetailModal";
import { CustomerListItemLayout } from "./CustomerListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ListItemTitleLink } from "@/components/common/List/ListItemTitle";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { BaseCustomerItemProps, CustomerItemProviders } from "../CustomerItem";
import { CustomerItemActionMenuTrigger } from "../CustomerItem/CustomerItemActionMenuTrigger";

interface Props extends BaseCustomerItemProps {
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
}

export function CustomerListItem({
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
        <CustomerListItemInner {...props} />
      </SelectableItem>
    </CustomerItemProviders>
  );
}

type InnerProps = Omit<Props, "deleteCustomer" | "updateCustomer">;

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
    editCustomerFormContainer,
  }: InnerProps) => {
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
            editCustomerFormContainer={editCustomerFormContainer}
          />
        }
      />
    );
  },
);
