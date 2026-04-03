"use client";

import {
  BaseUserItemProps,
  UserItemPendingOverlay,
  UserItemActionMenuTrigger,
} from "../UserItem";

import {
  ListItemText,
  ListItemTitle,
  ListItemTextLink,
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
import { UserListItemLayout } from "./UserListItemLayout";
import { useModal } from "@/components/common/ModalManagerContext";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

export function UserListItem(props: BaseUserItemProps) {
  return (
    <UserItemPendingOverlay>
      <UserListItemInner {...props} />
    </UserItemPendingOverlay>
  );
}

export const UserListItemInner = memo(function UserListItemInner({
  id,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
}: BaseUserItemProps) {
  const t = useTranslations("users.UserListItem");
  const { isOwner, isGuest } = useCurrentUser();
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");

  const userImg = (
    <ItemBaseUserImageContainer
      user={{ fullName, imageUrl }}
      width={36}
      height={36}
      className="h-9 w-9"
    />
  );

  // We show the action menu only for owners and guests
  const showActionMenuTrigger = isOwner || isGuest;

  return (
    <UserListItemLayout
      id={id}
      imgSlot={
        <ItemBaseDetailButton
          className="h-9 w-9"
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
