"use client";

import {
  ListItemText,
  ListItemTitle,
  ListItemTextLink,
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
import { useRole } from "@/common/RoleContext";
import { useModal } from "@/common/ModalManagerContext";
import { UserListItemLayout } from "./UserListItemLayout";
import { UserListItemSkeleton } from "./UserListItemSkeleton";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { useUserItemPending } from "../UserItem/useUserItemPending";
import { BaseUserItemProps, UserItemActionMenuTrigger } from "../UserItem";

export function UserListItem(props: BaseUserItemProps) {
  const isPending = useUserItemPending();

  return (
    <ListItemGate skeleton={<UserListItemSkeleton />}>
      <UserListItemInner {...props} isPending={isPending} />
    </ListItemGate>
  );
}

type InnerProps = BaseUserItemProps & {
  isPending: boolean;
};

const UserListItemInner = memo(function UserListItemInner({
  id,
  isPending,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
}: InnerProps) {
  const t = useTranslations("dashboard.users.UserListItem");
  const role = useRole();
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");

  const userImg = (
    <ItemBaseUserImageContainer
      user={{ fullName, imageUrl }}
      width={36}
      height={36}
      className="h-9 w-9"
    />
  );

  // We show the action menu only for owners and
  const showActionMenuTrigger = role === "owner";

  return (
    <UserListItemLayout
      data-id={id}
      className={isPending ? "pointer-events-none *:opacity-50" : undefined}
      imgSlot={
        <ItemBaseDetailButton
          className="h-9 w-9"
          aria-label={fullName}
          onPress={() => onUserDetailModalOpenChange(true)}
        >
          {userImg}
        </ItemBaseDetailButton>
      }
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onUserDetailModalOpenChange(true)}
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
      positionSlot={
        <>
          <ListItemTitle>
            {position ? position.name : t("noPosition")}
          </ListItemTitle>

          <ListItemText>{t("position")}</ListItemText>
        </>
      }
      menuTriggerSlot={
        showActionMenuTrigger ? (
          <UserItemActionMenuTrigger userId={id} />
        ) : undefined
      }
    />
  );
});
