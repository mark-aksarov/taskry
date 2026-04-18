"use client";

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
import { useUserItemPending } from "../UserItem/useUserItemPending";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { BaseUserItemProps, UserItemActionMenuTrigger } from "../UserItem";

export function UserListItem(props: BaseUserItemProps) {
  const isPending = useUserItemPending();
  return <UserListItemInner {...props} isPending={isPending} />;
}

type InnerProps = BaseUserItemProps & {
  isPending: boolean;
};

export const UserListItemInner = memo(function UserListItemInner({
  id,
  isPending,
  fullName,
  imageUrl,
  email,
  phoneNumber,
  publicLink,
  position,
}: InnerProps) {
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
