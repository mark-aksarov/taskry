"use client";

import {
  GridItemRow,
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemEmail,
  GridItemPublicLink,
  GridItemContactList,
  GridItemPhoneNumber,
} from "@/components/common/Grid";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/components/ui/Link";
import { Separator } from "@/components/ui/Separator";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ItemBaseUserImageContainer } from "@/components/common/ItemBase";
import { CustomerItemCheckbox } from "../CustomerItem/CustomerItemCheckbox";
import { BaseCustomerItemProps, CustomerItemProviders } from "../CustomerItem";
import { CustomerItemActionMenuTrigger } from "../CustomerItem/CustomerItemActionMenuTrigger";

export function CustomerGridItemMobile({
  deleteCustomer,
  updateCustomer,
  ...props
}: BaseCustomerItemProps) {
  return (
    <CustomerItemProviders
      customerId={props.id}
      deleteCustomer={deleteCustomer}
      updateCustomer={updateCustomer}
    >
      <div className="relative block">
        <Link
          href={`/customers/${props.id}`}
          className="absolute inset-0 z-0"
        />
        <CustomerGridItemMobileInner {...props} />
      </div>
    </CustomerItemProviders>
  );
}

type InnerProps = Omit<
  BaseCustomerItemProps,
  "deleteCustomer" | "updateCustomer"
>;

export const CustomerGridItemMobileInner = memo(
  ({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
    editCustomerFormContainer,
  }: InnerProps) => {
    const t = useTranslations("customers.CustomerGridItem");

    const customerImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={44}
        height={44}
        className="pointer-events-none h-11 w-11"
      />
    );

    return (
      <CustomerGridItemLayout
        topRowSlot={
          <GridItemRow>
            <CustomerItemActionMenuTrigger
              customerId={id}
              customerFullName={fullName}
              editCustomerFormContainer={editCustomerFormContainer}
              className="relative z-1 -mr-2 ml-auto"
            />
          </GridItemRow>
        }
        imageSlot={customerImg}
        titleSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitle>{fullName}</GridItemTitle>
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
