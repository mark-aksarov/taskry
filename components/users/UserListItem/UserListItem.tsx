"use client";

import {
  BaseUserItemProps,
  UserItemProviders,
  UserItemActionMenuTrigger,
} from "../UserItem";

import {
  ListItemText,
  ListItemTitle,
  ListItemTextLink,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { UserDetailModal } from "../UserDetailModal";
import { UserListItemLayout } from "./UserListItemLayout";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ListItemTitleLink } from "@/components/common/List/ListItemTitle";

interface Props extends BaseUserItemProps {
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function UserListItem(props: Props) {
  return (
    <UserItemProviders>
      <UserListItemInner {...props} />
    </UserItemProviders>
  );
}

export const UserListItemInner = memo(
  ({
    id,
    fullName,
    imageUrl,
    email,
    phoneNumber,
    publicLink,
    position,
    updateUserFormContainer,
    userDetailContainer,
    userDetailHeaderContainer,
  }: Props) => {
    const t = useTranslations("users.UserListItem");

    const { isOwner, isGuest } = useCurrentUser();

    const userImg = (
      <ItemBaseUserImageContainer
        user={{ fullName, imageUrl }}
        width={36}
        height={36}
        className="h-9 w-9"
      />
    );

    const userDetailModal = (
      <UserDetailModal
        userId={id}
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
      />
    );

    // We show the action menu only for owners and guests
    const showActionMenuTrigger = isOwner || isGuest;

    return (
      <UserListItemLayout
        id={id}
        imgSlot={
          <ItemBaseDetailModalTrigger
            modal={userDetailModal}
            className="h-9 w-9"
          >
            {userImg}
          </ItemBaseDetailModalTrigger>
        }
        mainSlot={
          <>
            <ListItemTitleDetailModalTrigger modal={userDetailModal}>
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
            <UserItemActionMenuTrigger
              updateUserFormContainer={updateUserFormContainer}
              userId={id}
              userFullName={fullName}
            />
          ) : undefined
        }
      />
    );
  },
);
