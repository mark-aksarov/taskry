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
import { ClientItemCheckbox } from "../ClientItem";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { ClientItemActionMenuTrigger } from "../ClientItem";
import { ClientListItemLayout } from "./ClientListItemLayout";
import { useModal } from "@/common/ModalManagerContext";
import { SelectableClientItem } from "../SelectableClientItem";
import { ClientListItemSkeleton } from "./ClientListItemSkeleton";
import { BaseClientItemProps, useClientItemPending } from "../ClientItem";

export function ClientListItem(props: BaseClientItemProps) {
  const isPending = useClientItemPending(props.id);

  return (
    <ListItemGate skeleton={<ClientListItemSkeleton />}>
      <SelectableClientItem clientId={props.id}>
        <ClientListItemInner {...props} isPending={isPending} />
      </SelectableClientItem>
    </ListItemGate>
  );
}

type InnerProps = BaseClientItemProps & {
  isPending: boolean;
};

const ClientListItemInner = memo(function ClientListItemInner({
  id,
  isPending,
  fullName,
  email,
  phoneNumber,
  publicLink,
  imageUrl,
  company,
}: InnerProps) {
  const t = useTranslations("dashboard.clients.ClientListItem");

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
    <ClientListItemLayout
      data-id={id}
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={<ClientItemCheckbox id={id} fullName={fullName} />}
      imgSlot={
        <ItemBaseDetailButton
          aria-label={fullName}
          onPress={() => onClientDetailModalOpenChange(true)}
          className="h-9 w-9"
        >
          {clientImg}
        </ItemBaseDetailButton>
      }
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onClientDetailModalOpenChange(true)}
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
      menuTriggerSlot={<ClientItemActionMenuTrigger clientId={id} />}
    />
  );
});
