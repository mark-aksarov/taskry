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
} from "@/dashboard/common/GridItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Link } from "@/ui/Link";
import { Separator } from "@/ui/Separator";
import { CustomerItemActionMenuTrigger } from "../CustomerItem";
import { CustomerGridItemLayout } from "./CustomerGridItemLayout";
import { ItemBaseUserImageContainer } from "@/dashboard/common/ItemBase";
import { CustomerGridItemMobileSkeleton } from "./CustomerGridItemSkeleton";
import { GridItemMobileGate } from "@/dashboard/common/GridItemMobileGate";
import { BaseCustomerItemProps, useCustomerItemPending } from "../CustomerItem";

export function CustomerGridItemMobile(props: BaseCustomerItemProps) {
  const isPending = useCustomerItemPending(props.id);

  return (
    <GridItemMobileGate skeleton={<CustomerGridItemMobileSkeleton />}>
      <CustomerGridItemMobileInner {...props} isPending={isPending} />
    </GridItemMobileGate>
  );
}

type InnerProps = BaseCustomerItemProps & {
  isPending: boolean;
};

export const CustomerGridItemMobileInner = memo(
  function CustomerGridItemMobileInner({
    id,
    isPending,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
  }: InnerProps) {
    const t = useTranslations("dashboard.customers.CustomerGridItem");

    const customerImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={44}
        height={44}
        className="pointer-events-none h-11 w-11"
      />
    );

    return (
      <div
        className={twMerge(
          "relative block",
          isPending && "pointer-events-none",
        )}
      >
        <Link
          href={`/customers/${id}`}
          className="absolute inset-0 z-0"
          aria-label={fullName}
        />

        <CustomerGridItemLayout
          className={isPending ? "*:opacity-50" : undefined}
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
      </div>
    );
  },
);
