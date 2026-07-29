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
} from "@/dashboard/common/GridItem";

import {
  ItemBaseDetailButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { Separator } from "@/ui/Separator";
import { useModal } from "@/common/ModalManagerContext";
import { ClientItemActionMenuTrigger } from "../ClientItem";
import { ClientGridItemLayout } from "./ClientGridItemLayout";
import { SelectableClientItem } from "../SelectableClientItem";
import { GridItemLargeGate } from "@/dashboard/common/GridItemLargeGate";
import { ClientGridItemLargeSkeleton } from "./ClientGridItemSkeleton";
import { ClientItemCheckbox } from "../ClientItem/ClientItemCheckbox";
import { BaseClientItemProps, useClientItemPending } from "../ClientItem";

export function ClientGridItemLarge(props: BaseClientItemProps) {
  const isPending = useClientItemPending(props.id);

  return (
    <GridItemLargeGate skeleton={<ClientGridItemLargeSkeleton />}>
      <SelectableClientItem clientId={props.id}>
        <ClientGridItemLargeInner {...props} isPending={isPending} />
      </SelectableClientItem>
    </GridItemLargeGate>
  );
}

type InnerProps = BaseClientItemProps & {
  isPending: boolean;
};

const ClientGridItemLargeInner = memo(function ClientGridItemLargeInner({
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

  const { onOpenChange: onClientDetailModalOpenChange } =
    useModal("clientDetail");

  const clientImg = (
    <ItemBaseUserImageContainer
      user={{ fullName, imageUrl }}
      width={36}
      height={36}
      className="h-9 w-9"
    />
  );

  return (
    <ClientGridItemLayout
      className={isPending ? "*:opacity-50" : undefined}
      topRowSlot={
        <GridItemRow>
          <ClientItemCheckbox id={id} fullName={fullName} />
          <ClientItemActionMenuTrigger clientId={id} className="-mr-2" />
        </GridItemRow>
      }
      imageSlot={
        <ItemBaseDetailButton
          aria-label={fullName}
          onPress={() => onClientDetailModalOpenChange(true)}
        >
          {clientImg}
        </ItemBaseDetailButton>
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitleButton
            onPress={() => onClientDetailModalOpenChange(true)}
          >
            {fullName}
          </GridItemTitleButton>

          <GridItemText>{company ? company.name : t("noCompany")}</GridItemText>
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
});
