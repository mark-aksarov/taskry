"use client";

import {
  BaseUserItemProps,
  UserItemProviders,
  UserItemActionMenuTrigger,
} from "../UserItem";

import {
  GridItemInfo,
  GridItemText,
  GridItemEmail,
  GridItemPublicLink,
  GridItemContactList,
  GridItemPhoneNumber,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { UserDetailModal } from "../UserDetailModal";
import { Separator } from "@/components/ui/Separator";
import { UserGridItemLayout } from "./UserGridItemLayout";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

interface Props extends BaseUserItemProps {
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function UserGridItemLarge({ deleteUser, ...props }: Props) {
  return (
    <UserItemProviders deleteUser={deleteUser}>
      <UserGridItemLargeInner {...props} />
    </UserItemProviders>
  );
}

type InnerProps = Omit<Props, "deleteUser">;

const UserGridItemLargeInner = memo(
  ({
    id,
    fullName,
    imageUrl,
    position,
    phoneNumber,
    publicLink,
    email,
    updateUserFormContainer,
    userDetailContainer,
    userDetailHeaderContainer,
  }: InnerProps) => {
    const t = useTranslations("users.UserGridItem");

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
      <UserGridItemLayout
        actionMenuSlot={
          showActionMenuTrigger ? (
            <UserItemActionMenuTrigger
              updateUserFormContainer={updateUserFormContainer}
              userId={id}
              userFullName={fullName}
              className="-mr-2"
            />
          ) : undefined
        }
        imageSlot={
          <ItemBaseDetailModalTrigger modal={userDetailModal}>
            {userImg}
          </ItemBaseDetailModalTrigger>
        }
        titleSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitleDetailModalTrigger modal={userDetailModal}>
              {fullName}
            </GridItemTitleDetailModalTrigger>

            <GridItemText>
              {position ? position.name : t("noPosition")}
            </GridItemText>
          </GridItemInfo>
        }
        phoneNumberSlot={
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
