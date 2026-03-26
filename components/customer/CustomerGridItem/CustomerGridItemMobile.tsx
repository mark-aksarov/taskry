"use client";

import {
  BaseCustomerItemProps,
  CustomerItemPendingOverlay,
} from "../CustomerItem";

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
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ItemBaseUserImageContainer } from "@/components/common/ItemBase";

export function CustomerGridItemMobile(props: BaseCustomerItemProps) {
  return (
    <CustomerItemPendingOverlay customerId={props.id}>
      <div className="relative block">
        <Link
          href={`/customers/${props.id}`}
          className="absolute inset-0 z-0"
        />
        <CustomerGridItemMobileInner {...props} />
      </div>
    </CustomerItemPendingOverlay>
  );
}

export const CustomerGridItemMobileInner = memo(
  ({
    id,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
  }: BaseCustomerItemProps) => {
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
