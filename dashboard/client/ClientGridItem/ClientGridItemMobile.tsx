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
import { BaseLink } from "@/ui/Link";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Separator } from "@/ui/Separator";
import { ClientItemActionMenuTrigger } from "../ClientItem";
import { ClientGridItemLayout } from "./ClientGridItemLayout";
import { ItemBaseUserImageContainer } from "@/dashboard/common/ItemBase";
import { ClientGridItemMobileSkeleton } from "./ClientGridItemSkeleton";
import { GridItemMobileGate } from "@/dashboard/common/GridItemMobileGate";
import { BaseClientItemProps, useClientItemPending } from "../ClientItem";

export function ClientGridItemMobile(props: BaseClientItemProps) {
  const isPending = useClientItemPending(props.id);

  return (
    <GridItemMobileGate skeleton={<ClientGridItemMobileSkeleton />}>
      <ClientGridItemMobileInner {...props} isPending={isPending} />
    </GridItemMobileGate>
  );
}

type InnerProps = BaseClientItemProps & {
  isPending: boolean;
};

export const ClientGridItemMobileInner = memo(
  function ClientGridItemMobileInner({
    id,
    isPending,
    fullName,
    email,
    phoneNumber,
    publicLink,
    imageUrl,
    company,
  }: InnerProps) {
    const t = useTranslations("dashboard.clients.ClientGridItem");

    const clientImg = (
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
        <BaseLink
          href={`/clients/${id}`}
          className="absolute inset-0 z-0"
          aria-label={fullName}
        />

        <ClientGridItemLayout
          className={isPending ? "*:opacity-50" : undefined}
          topRowSlot={
            <GridItemRow>
              <ClientItemActionMenuTrigger
                clientId={id}
                className="relative z-1 -mr-2 ml-auto"
              />
            </GridItemRow>
          }
          imageSlot={clientImg}
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
